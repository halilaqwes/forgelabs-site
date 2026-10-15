import { ChevronDown } from "lucide-react";
import { EMAIL, STORE } from "../site-data";
import { Eyebrow, Reveal } from "../ui";
const questions = [
  [
    "Stat Boost’u nereden indirebilirim?",
    <>
      Android cihazın için{" "}
      <a href={STORE} target="_blank" rel="noopener noreferrer">
        Google Play’den
      </a>{" "}
      indirebilirsin. Güncel sürüm ve cihaz uyumluluğu mağaza sayfasında yer
      alır.
    </>,
  ],
  [
    "Ücretsiz mi?",
    "Uygulamayı Google Play üzerinden indirebilirsin. Uygulama içi satın alma seçenekleri bulunur; güncel fiyatları ve kapsamı uygulama içinden kontrol edebilirsin.",
  ],
  [
    "İnternet olmadan kullanabilir miyim?",
    "Evet. Mağaza açıklamasına göre antrenmanlarını çevrimdışıyken kaydedebilir, bağlantın geri geldiğinde bulutla senkronize edebilirsin.",
  ],
  [
    "Verilerim ve hesabımla ilgili destek alabilir miyim?",
    <>
      <a href="/privacy.html">Gizlilik politikasını</a> inceleyebilir, hesabın
      ve veri taleplerin için <a href={`mailto:${EMAIL}`}>{EMAIL}</a> adresine
      yazabilirsin. Şifreni veya doğrulama kodlarını paylaşma.
    </>,
  ],
];
export default function FAQ() {
  return (
    <section className="faq-section section-space">
      <div className="wrap faq-layout">
        <Reveal>
          <Eyebrow>ÜRÜN DESTEĞİ</Eyebrow>
          <h2>
            Aklında
            <br />
            bir şey mi var?
          </h2>
        </Reveal>
        <div className="faq-list">
          {questions.map(([question, answer], i) => (
            <details key={question}>
              <summary>
                <span className="mono">0{i + 1}</span>
                {question}
                <ChevronDown size={18} />
              </summary>
              <div className="faq-answer">{answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
