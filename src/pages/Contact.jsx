import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  MessageSquare,
  LifeBuoy,
  Lightbulb,
} from "lucide-react";
import { EMAIL } from "../site-data";
import { Eyebrow, PageIntro, Reveal } from "../ui";
import FAQ from "../components/FAQ";

export default function Contact() {
  const [category, setCategory] = useState("Ürün geri bildirimi");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [draftOpened, setDraftOpened] = useState(false);
  const [messageError, setMessageError] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  const draft = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const message = String(form.get("message") || "").trim();
    if (message.length < 10) {
      setMessageError("Lütfen en az 10 karakterlik bir mesaj yaz.");
      return;
    }
    setMessageError("");
    const body = `${name ? `Merhaba, ben ${name}.\n\n` : "Merhaba ForgeLabs,\n\n"}${message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`ForgeLabs / ${category}`)}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  };
  return (
    <>
      <PageIntro
        number="04"
        eyebrow="İLETİŞİM"
        title="Bir merhaba,"
        accent="çok şeyi başlatır."
        description="Bir fikrin, bir sorunun ya da “şöyle olsa daha iyi olurdu” dediğin bir detay mı var? Dinlemek isteriz."
      />
      <section id="contact" className="wrap contact-layout">
        <div>
          <Reveal className="contact-email-card">
            <span className="mono">DOĞRUDAN BİZE ULAŞ</span>
            <a href={`mailto:${EMAIL}`}>
              {EMAIL}
              <ArrowUpRight />
            </a>
            <button onClick={copy} className="copy-email">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Adres kopyalandı" : "E-posta adresini kopyala"}
            </button>
            <p className="copy-status" role="status">
              {copyError
                ? "Kopyalama kullanılamıyor. Yukarıdaki adrese tıklayabilirsin."
                : copied
                  ? "E-posta adresi panona kopyalandı."
                  : ""}
            </p>
          </Reveal>
          <div className="contact-reasons">
            {[
              [
                LifeBuoy,
                "Stat Boost desteği",
                "Bir hata mı gördün? Cihaz modelin, uygulama sürümü ve sorunu nasıl yaşadığın bize yardımcı olur.",
              ],
              [
                MessageSquare,
                "Ürün geri bildirimi",
                "Kullanırken eksik bulduğun bir akış, yeni bir özellik fikri veya küçük bir öneri.",
              ],
              [
                Lightbulb,
                "Birlikte düşünelim",
                "Dijital bir ürün fikri, iş birliği veya çözmek istediğin bir ihtiyaç.",
              ],
            ].map(([Icon, title, text]) => (
              <Reveal key={title}>
                <Icon />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="contact-composer">
          <Eyebrow>MESAJINA BİR BAŞLANGIÇ</Eyebrow>
          <h2>Aklındakini anlat.</h2>
          <form onSubmit={draft}>
            <label htmlFor="topic">Ne hakkında konuşalım?</label>
            <select
              id="topic"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>Ürün geri bildirimi</option>
              <option>Stat Boost desteği</option>
              <option>İş birliği / ürün fikri</option>
              <option>Veri ve hesap talebi</option>
            </select>
            <label htmlFor="sender-name">
              İsmin <span>(isteğe bağlı)</span>
            </label>
            <input
              id="sender-name"
              name="name"
              autoComplete="name"
              maxLength={100}
              placeholder="Sana nasıl hitap edelim?"
            />
            <label htmlFor="message">Mesajın</label>
            <textarea
              aria-describedby="message-error composer-note"
              aria-invalid={messageError ? true : undefined}
              id="message"
              name="message"
              required
              minLength={10}
              maxLength={3000}
              rows={5}
              placeholder="Kısaca ihtiyacından, fikrinden veya yaşadığın sorundan bahsedebilirsin."
            />
            <button type="submit" className="button button-lime">
              E-posta taslağını aç <ArrowUpRight size={17} />
            </button>
            <p id="message-error" className="draft-status" role="alert">
              {messageError}
            </p>
            <p id="composer-note" className="composer-note">
              Bu form e-posta uygulamanda bir taslak açar. Mesajın buradan
              otomatik gönderilmez. E-posta uygulaman yoksa adresimizi
              kopyalayabilirsin.
            </p>
            <p role="status" className="draft-status">
              {draftOpened
                ? "E-posta uygulamana geçiş istendi. Açılmadıysa adresimizi kopyalayıp mesajını doğrudan yazabilirsin."
                : ""}
            </p>
          </form>
        </Reveal>
      </section>
      <FAQ />
    </>
  );
}
