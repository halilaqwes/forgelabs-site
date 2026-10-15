import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { render } from "../.prerender/entry-server.js";
import { routes, notFound, ORIGIN, routeHref } from "../src/site-data.js";

const template = await readFile(resolve("dist/index.html"), "utf8");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const renderPage = (route, html, is404 = false) => {
  const url = ORIGIN + routeHref(route.path);
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escape(route.title)}</title>`,
  );
  for (const [attr, key, value] of [
    ["name", "description", route.description],
    ["property", "og:title", route.title],
    ["property", "og:description", route.description],
    ["property", "og:url", url],
    ["name", "twitter:title", route.title],
    ["name", "twitter:description", route.description],
  ]) {
    html = html.replace(
      new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*\\/>`),
      `<meta ${attr}="${key}" content="${escape(value)}" />`,
    );
  }
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${url}" />`,
  );
  if (is404)
    html = html.replace(
      "</head>",
      '<meta name="robots" content="noindex" /></head>',
    );
  return html.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered="true">${render(route.path)}</div>`,
  );
};
for (const route of routes) {
  const target = resolve(
    "dist",
    route.path === "/" ? "index.html" : route.path.slice(1) + "/index.html",
  );
  await mkdir(dirname(target), { recursive: true });
  const html = renderPage(route, template);
  if (!html.includes('data-prerendered="true"'))
    throw new Error(`Prerender failed: ${route.path}`);
  await writeFile(target, html);
  console.log(`Prerendered ${route.path}`);
}
await writeFile(
  resolve("dist/404.html"),
  renderPage({ ...notFound, path: "/404" }, template, true),
);
await writeFile(
  resolve("dist/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${ORIGIN}${routeHref(route.path)}</loc></url>`).join("\n")}\n  <url><loc>${ORIGIN}/privacy.html</loc></url>\n</urlset>\n`,
);
