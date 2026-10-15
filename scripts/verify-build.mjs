import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { routes, ORIGIN, routeHref, normalizePath } from "../src/site-data.js";
import { fitnessArticles, journalCSV } from "../src/fitness-data.js";
import { calculateVolume, compareVolume } from "../src/volume.js";

const fileFor = (path) =>
  path === "/" ? "dist/index.html" : `dist${normalizePath(path)}/index.html`;
assert.equal(normalizePath("/urunler/stat-boost/"), "/urunler/stat-boost");
assert.equal(normalizePath("/"), "/");
assert.equal(normalizePath("/%invalid/"), "/%invalid");
assert.equal(new Set(routes.map((route) => route.path)).size, routes.length);
assert.equal(new Set(routes.map(route => route.title)).size, routes.length, "Duplicate titles");
assert.equal(new Set(routes.map(route => route.description)).size, routes.length, "Duplicate descriptions");
assert.equal(calculateVolume([{ weight: "50", reps: "10" }, { weight: "50", reps: "9" }, { weight: "45", reps: "10" }]), 1400);
for (const row of [{weight:"",reps:"10"}, {weight:" ",reps:"10"}, {weight:"-1",reps:"10"}, {weight:"1001",reps:"10"}, {weight:"60",reps:"1.5"}, {weight:"60",reps:"0"}, {weight:"60",reps:"201"}, {weight:"Infinity",reps:"10"}, {weight:"60",reps:""}]) assert.equal(calculateVolume([row]), null);
assert.equal(calculateVolume([]), null);
assert.equal(journalCSV.trim().split("\n").length, 2);
assert.equal(journalCSV.split("\n")[0].split(",").length, 8);
assert.equal(calculateVolume([{weight:"62.5",reps:"10"}]), 625);
assert.equal(calculateVolume([{weight:"0",reps:"10"}]), 0);
assert.equal(compareVolume(0, 100).percent, null);
assert.equal(compareVolume(null, 100), null);
assert.equal(compareVolume(1800, 1860).difference, 60);
assert.ok(Math.abs(compareVolume(1500, 1400).percent + 6.6666666667) < 0.0001);
for (const route of routes) {
  const html = await readFile(fileFor(route.path), "utf8");
  assert.ok(!html.includes('name="robots" content="noindex"'), `Unexpected noindex: ${route.path}`);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(schemas.length, 1, `Expected one schema graph: ${route.path}`);
  const graph = JSON.parse(schemas[0][1])["@graph"];
  assert.ok(graph.some(node => node["@type"] === "WebSite"));
  const webpage = graph.find(node => ["WebPage", "CollectionPage"].includes(node["@type"]));
  assert.equal(webpage.url, ORIGIN + routeHref(route.path));
  if (route.path !== "/") {
    const breadcrumb = graph.find(node => node["@type"] === "BreadcrumbList");
    assert.equal(breadcrumb.itemListElement.at(-1).item, webpage.url);
  }
  if (fitnessArticles.some(article => article.path === route.path)) {
    assert.ok(graph.some(node => node["@type"] === "Article" && node.citation.length));
    assert.ok(html.includes('property="og:type" content="article"'));
    assert.ok(html.includes('id="kaynaklar"'));
  }
  if (route.path === "/fitness/antrenman-gunlugu") {
    assert.ok(html.includes('download="forgelabs-antrenman-gunlugu.csv"'));
    assert.ok(html.includes(encodeURIComponent("\uFEFF" + journalCSV)), "Incorrect CSV payload");
  }
  assert.ok(!graph.some(node => node.aggregateRating || node.review), "No invented ratings");
  assert.ok(
    html.includes(`data-prerendered="true"`),
    `Missing HTML: ${route.path}`,
  );
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `Expected one h1: ${route.path}`,
  );
  assert.ok(
    html.includes(`<title>${route.title}</title>`),
    `Wrong title: ${route.path}`,
  );
  assert.ok(
    html.includes(`rel="canonical" href="${ORIGIN}${routeHref(route.path)}"`),
    `Wrong canonical: ${route.path}`,
  );
  assert.ok(
    html.includes(`name="description" content="${route.description}"`),
    `Wrong description: ${route.path}`,
  );
  for (const [, href] of html.matchAll(/href="([^"]*)"/g)) {
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const target = new URL(
      href.replaceAll("&amp;", "&"),
      ORIGIN + routeHref(route.path),
    );
    const path = normalizePath(target.pathname);
    let targetHtml = html;
    if (path !== route.path) {
      if (path.endsWith(".html")) {
        await access(resolve("dist", path.slice(1)));
        targetHtml = await readFile(resolve("dist", path.slice(1)), "utf8");
      } else if (/\.[a-z0-9]+$/i.test(path)) {
        await access(resolve("dist", path.slice(1)));
        continue;
      } else {
        assert.ok(
          routes.some((item) => item.path === path),
          `Unknown link ${href} on ${route.path}`,
        );
        targetHtml = await readFile(fileFor(path), "utf8");
      }
    }
    if (target.hash)
      assert.ok(
        targetHtml.includes(`id="${target.hash.slice(1)}"`),
        `Broken anchor ${href} on ${route.path}`,
      );
  }
  for (const [, src] of html.matchAll(/<img[^>]*src="([^"]*)"/g))
    if (src.startsWith("/")) await access(resolve("dist", src.slice(1)));
  console.log(`Verified ${route.path}: HTML, metadata, links and images`);
}
const errorPage = await readFile("dist/404.html", "utf8");
assert.ok(errorPage.includes('name="robots" content="noindex"'));
const sitemap = await readFile("dist/sitemap.xml", "utf8");
for (const route of routes)
  assert.ok(sitemap.includes(`${ORIGIN}${routeHref(route.path)}`));
assert.ok(sitemap.includes("/privacy.html"));
console.log("Verified sitemap and custom 404");
assert.equal((sitemap.match(/<url>/g) || []).length, routes.length + 1);
console.log("Verified unique metadata, page schema graphs, article sources and calculator edge cases");
