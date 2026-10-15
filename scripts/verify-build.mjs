import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { routes, ORIGIN, routeHref, normalizePath } from "../src/site-data.js";

const fileFor = (path) =>
  path === "/" ? "dist/index.html" : `dist${normalizePath(path)}/index.html`;
assert.equal(normalizePath("/urunler/stat-boost/"), "/urunler/stat-boost");
assert.equal(normalizePath("/"), "/");
assert.equal(normalizePath("/%invalid/"), "/%invalid");
assert.equal(new Set(routes.map((route) => route.path)).size, routes.length);
for (const route of routes) {
  const html = await readFile(fileFor(route.path), "utf8");
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
