import { ORIGIN, EMAIL, STORE, getRoute, routeHref } from "./site-data.js";
import { fitnessArticles, FITNESS_DATE } from "./fitness-data.js";

export function breadcrumbs(path) {
  const route = getRoute(path);
  const items = [{ name: "ForgeLabs", path: "/" }];
  if (!route || path === "/") return items;
  if (path.startsWith("/fitness/")) items.push({ name: "Fitness rehberi", path: "/fitness" });
  if (path.startsWith("/urunler/")) items.push({ name: "Ürünler", path: "/urunler" });
  items.push({ name: route.label, path });
  return items;
}
export function structuredData(path) {
  const route = getRoute(path);
  if (!route) return { "@context": "https://schema.org", "@graph": [] };
  const url = ORIGIN + routeHref(path);
  const org = `${ORIGIN}/#organization`, website = `${ORIGIN}/#website`;
  const article = fitnessArticles.find(item => item.path === path);
  const graph = [
    { "@type": "Organization", "@id": org, name: "ForgeLabs", alternateName: "Forge Labs", url: ORIGIN + "/", email: EMAIL, logo: ORIGIN + "/favicon.svg" },
    { "@type": "WebSite", "@id": website, url: ORIGIN + "/", name: "ForgeLabs", alternateName: "Forge Labs", inLanguage: "tr-TR", publisher: { "@id": org } },
    { "@type": path === "/fitness" ? "CollectionPage" : "WebPage", "@id": url + "#webpage", url, name: route.title, description: route.description, inLanguage: "tr-TR", isPartOf: { "@id": website }, ...(path !== "/" ? { breadcrumb: { "@id": url + "#breadcrumb" } } : {}) },
  ];
  if (path !== "/") graph.push({ "@type": "BreadcrumbList", "@id": url + "#breadcrumb", itemListElement: breadcrumbs(path).map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: ORIGIN + routeHref(item.path) })) });
  if (article) graph.push({ "@type": "Article", "@id": url + "#article", headline: article.heading, description: article.description, datePublished: FITNESS_DATE, inLanguage: "tr-TR", author: { "@type": "Organization", name: "ForgeLabs ürün ekibi", url: ORIGIN + "/studio/" }, publisher: { "@id": org }, mainEntityOfPage: { "@id": url + "#webpage" }, citation: article.sources.map(source => source.url) });
  if (path === "/urunler/stat-boost") graph.push({ "@type": "SoftwareApplication", "@id": url + "#application", name: "Stat Boost", operatingSystem: "Android", applicationCategory: "HealthApplication", url, installUrl: STORE, downloadUrl: STORE, image: ORIGIN + "/images/statboost-icon.webp", description: route.description, publisher: { "@id": org } });
  return { "@context": "https://schema.org", "@graph": graph };
}
export const serializeSchema = (schema) => JSON.stringify(schema).replaceAll("<", "\\u003c");
