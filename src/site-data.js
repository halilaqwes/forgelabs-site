export const STORE = "https://play.google.com/store/apps/details?id=stat.boost";
export const EMAIL = "forgelabss.dev@gmail.com";
export const ORIGIN = "https://www.forgelabs.site";

export const routes = [
  {
    path: "/",
    label: "Ana Sayfa",
    title: "ForgeLabs — Meraktan Ürüne",
    description:
      "Gerçek ihtiyaçlardan doğan dijital ürünler. ForgeLabs bağımsız ürün stüdyosu; Stat Boost, tasarım, teknoloji ve etkileşimli deneyler.",
  },
  {
    path: "/urunler",
    label: "Ürünler",
    title: "Ürünler — ForgeLabs",
    description:
      "ForgeLabs’in geliştirdiği dijital ürünleri keşfet. İlk ürünümüz Stat Boost; Android için antrenman kaydı ve gelişim takibi.",
  },
  {
    path: "/urunler/stat-boost",
    label: "Stat Boost",
    title: "Stat Boost — Her Setin Bir Sonraki Adımı Var | ForgeLabs",
    description:
      "Setlerini kaydet, kişisel rekorlarını ve gelişimini takip et. Stat Boost antrenman günlüğü Android için Google Play’de yayında.",
  },
  {
    path: "/studio",
    label: "Stüdyo",
    title: "Stüdyo — Bir Fikri Gerçeğe Dövmek | ForgeLabs",
    description:
      "ForgeLabs’in ürün yaklaşımı: gerçek bir ihtiyacı anlamak, sade bir deneyim tasarlamak, geliştirmek ve geri bildirimle iyileştirmek.",
  },
  {
    path: "/lab",
    label: "Lab",
    title: "Lab — Fikirlerin Oyun Alanı | ForgeLabs",
    description:
      "Piksel parçacıkları, etkileşimli hareket deneyleri ve Stat Boost antrenman demosu. ForgeLabs’in tarayıcıda çalışan deney alanı.",
  },
  {
    path: "/iletisim",
    label: "İletişim",
    title: "İletişim ve Ürün Desteği — ForgeLabs",
    description:
      "Stat Boost desteği, ürün geri bildirimi ve iş birliği için ForgeLabs ile iletişime geç. Doğrulanmış destek adresimiz: forgelabss.dev@gmail.com.",
  },
];
export const navigation = routes.filter(
  (route) => !["/", "/urunler/stat-boost"].includes(route.path),
);
export const routeHref = (path) => (path === "/" ? "/" : `${path}/`);
export function normalizePath(path) {
  let decoded = path;
  try {
    decoded = decodeURI(path);
  } catch {
    /* malformed addresses resolve to 404 */
  }
  return decoded.replace(/\/+$/, "") || "/";
}
export const getRoute = (path) =>
  routes.find((route) => route.path === normalizePath(path));
export const notFound = {
  title: "Sayfa Bulunamadı — ForgeLabs",
  description:
    "Bu sayfa bulunamadı. ForgeLabs ürünlerini ve deneylerini keşfetmek için ana sayfaya dön.",
};
