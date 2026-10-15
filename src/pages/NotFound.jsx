import ForgeField from "../components/ForgeField";
import { PageIntro } from "../ui";
import SiteLink from "../SiteLink";
export default function NotFound() {
  return (
    <div className="not-found-page">
      <PageIntro
        number="404"
        eyebrow="BURADA BİR SAYFA YOK"
        title="Bu fikir henüz"
        accent="bir sayfa olmamış."
        description="Bağlantı değişmiş veya adres yanlış yazılmış olabilir. Ürünlerimize ya da ana sayfaya dönebilirsin."
      >
        <SiteLink href="/" className="button button-lime">
          Ana sayfaya dön ↗
        </SiteLink>
      </PageIntro>
      <ForgeField />
    </div>
  );
}
