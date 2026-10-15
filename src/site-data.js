import { fitnessArticles } from "./fitness-data.js";
export const STORE = "https://play.google.com/store/apps/details?id=stat.boost";
export const EMAIL = "forgelabss.dev@gmail.com";
export const ORIGIN = "https://www.forgelabs.site";

export const routes = [
  {
    path: "/",
    label: "Ana Sayfa",
    title: "ForgeLabs — Stat Boost ve Fitness Takip Araçları",
    description:
      "ForgeLabs ürün stüdyosu. Stat Boost Android antrenman takip uygulamasını, fitness kayıt rehberlerini ve ücretsiz hacim hesaplayıcıyı keşfet.",
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
    title: "Stat Boost — Android Antrenman Takip Uygulaması | ForgeLabs",
    description:
      "Stat Boost ile ağırlık, set, tekrar ve RPE kaydet; geçmiş antrenmanlarını ve kişisel rekorlarını takip et. Android için Google Play’de.",
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
  {
    path: "/fitness",
    label: "Fitness rehberi",
    title: "Fitness Rehberi — Antrenman Takibi ve Hesaplama | ForgeLabs",
    description: "Antrenman günlüğü, progressive overload ve hacim hesabı için kaynaklı Türkçe rehberler. Kayıt örnekleri ve ücretsiz antrenman hacmi hesaplayıcı.",
  },
  ...fitnessArticles,
  {
    path: "/fitness/hacim-hesaplayici",
    label: "Hacim hesaplayıcı",
    title: "Antrenman Hacmi Hesaplayıcı — Set × Tekrar × Kilo | ForgeLabs",
    description: "Antrenman hacmini set, tekrar ve ağırlıkla hesapla. İki kaydın tonajını ve yüzde değişimini karşılaştır. Üyeliksiz, tarayıcıda çalışan ücretsiz araç.",
  },
];
export const navigation = ["/urunler", "/fitness", "/studio", "/lab", "/iletisim"].map(path => routes.find(route => route.path === path));
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
