import { useState } from "react";
import { ArrowUpRight, BookOpen, Calculator, Download } from "lucide-react";
import { PageIntro, Eyebrow, TextLink, StoreLink } from "../ui";
import SiteLink from "../SiteLink";
import { fitnessArticles, FITNESS_DATE, journalCSV } from "../fitness-data";
import { calculateVolume, compareVolume } from "../volume";
import "../fitness.css";

const format = (value) => new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 }).format(value);

export function FitnessLinks({ exclude }) {
  return <div className="fitness-cards">{fitnessArticles.filter(article => article.path !== exclude).map((article, i) => <SiteLink className="fitness-card" key={article.path} href={`${article.path}/`}>
    <span className="mono">0{i + 1} / REHBER <ArrowUpRight size={19} /></span>
    <h3>{article.label}</h3><p>{article.summary}</p><span className="text-link">Rehberi oku <ArrowUpRight size={16} /></span>
  </SiteLink>)}</div>;
}

export function FitnessHub() {
  return <>
    <PageIntro eyebrow="FITNESS REHBERİ" title="Antrenmanını kaydet." accent="Gelişimini anlamlandır." description="Set, tekrar ve ağırlıkların bir hikâyesi var. ForgeLabs’in fitness rehberleriyle o hikâyeyi daha tutarlı oku; Stat Boost ile kaydını yanında taşı." />
    <section className="wrap fitness-section">
      <div className="fitness-section-heading"><Eyebrow>NEREDEN BAŞLAMALI?</Eyebrow><h2>Bir kayıt. Bir karşılaştırma. Daha net bir bakış.</h2></div>
      <p className="fitness-lead">Bu merkez, direnç antrenmanında kayıt tutma ve verileri okuma üzerine odaklanır. Bir spor salonu programı, beslenme reçetesi veya kişisel sağlık danışmanlığı değildir. Önce günlük düzenini kur, sonra benzer kayıtları karşılaştır.</p>
      <FitnessLinks />
    </section>
    <section className="wrap fitness-tool-banner">
      <Calculator size={36} /><div><Eyebrow>TARAYICIDA ÇALIŞIR · ÜYELİK YOK</Eyebrow><h2>Hacmi tahmin etme. Hesapla.</h2><p>İki kaydı set set gir. Toplam tonajı, farkı ve yüzde değişimini gör. Verilerin sunucuya gönderilmez.</p><TextLink href="/fitness/hacim-hesaplayici/">Hacim hesaplayıcıyı aç</TextLink></div>
      <span className="fitness-formula" aria-hidden="true">Σ <small>kg × tekrar</small></span>
    </section>
    <section className="wrap fitness-section fitness-editorial"><BookOpen /><div><h2>Ölçülü içerik. Açık kaynaklar.</h2><p>Rehberleri ForgeLabs ürün ekibi yayımlar. Amacımız kayıt ve hesap yöntemlerini anlaşılır kılmak; tıbbi veya antrenörlük yetkinliği iddia etmiyoruz. Araştırma kullanılan rehberlerde kaynaklar görünürdür. Hesap örnekleri özgün açıklama örnekleridir, kişiye özel yük önerisi değildir.</p><p>Bir hata fark ettin mi? <SiteLink href="/iletisim/">Düzeltme önerini ilet.</SiteLink> İçerikler yalnız anlamlı değişiklik olduğunda güncellenir.</p></div></section>
  </>;
}

export function FitnessArticle({ path }) {
  const article = fitnessArticles.find(item => item.path === path);
  if (!article) return null;
  return <article className="fitness-article wrap">
    <nav className="breadcrumbs" aria-label="İçerik yolu"><SiteLink href="/">ForgeLabs</SiteLink><span>/</span><SiteLink href="/fitness/">Fitness rehberi</SiteLink><span>/</span><span>{article.label}</span></nav>
    <header className="fitness-article-header"><Eyebrow>ANTRENMAN TAKİBİ / REHBER</Eyebrow><h1 tabIndex={-1}>{article.heading}</h1><p>{article.summary}</p><div className="fitness-byline"><SiteLink href="/studio/">Yayınlayan: ForgeLabs ürün ekibi</SiteLink><time dateTime={FITNESS_DATE}>16 Ekim 2026</time></div></header>
    <div className="fitness-reading-layout">
      <aside className="fitness-toc"><nav aria-label="Bu rehberde"><span className="mono">BU REHBERDE</span>{article.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}<a href="#kaynaklar">Kaynaklar ve kapsam</a></nav></aside>
      <div className="fitness-prose"><div className="fitness-answer"><span className="mono">KISA CEVAP</span><p>{article.answer}</p></div>
        {article.sections.map(section => <section key={section.id} id={section.id}><h2>{section.title}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}
        {path.endsWith("antrenman-gunlugu") && <a className="button button-lime fitness-download" href={`data:text/csv;charset=utf-8,${encodeURIComponent("\uFEFF" + journalCSV)}`} download="forgelabs-antrenman-gunlugu.csv"><Download size={18} /> CSV günlük şablonunu indir</a>}
        <div className="fitness-next-tool"><h2>Şimdi kendi kaydını karşılaştır.</h2><p>Hacim hesabını iki antrenman için ayrı ayrı yap. Sonuçları bir performans puanı olarak değil, kayıt özeti olarak oku.</p><TextLink href="/fitness/hacim-hesaplayici/">Hacim hesaplayıcıya git</TextLink></div>
        <section id="kaynaklar" className="fitness-sources"><h2>Kaynaklar ve kapsam</h2><ul>{article.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a></li>)}</ul><p>Kaynaklar kavram ve ürün bilgisi içindir; buradaki kayıt akışı ve sayısal örnekler ForgeLabs tarafından hazırlanmıştır. Bu içerik uzman incelemesinden geçmiş kişisel antrenman veya sağlık önerisi değildir. Özelliklerin güncel kapsamı için mağaza açıklamasını kontrol et.</p><SiteLink href="/iletisim/">Hata bildir veya düzeltme öner</SiteLink></section>
      </div>
    </div>
    <section className="fitness-section"><h2>Bir sonraki adım</h2><FitnessLinks exclude={path} /><div className="fitness-product-note"><p>Kaydını telefonda tutmak ister misin? Stat Boost, Android için antrenman kaydı ve gelişim takibi sunar.</p><TextLink href="/urunler/stat-boost/">Stat Boost’u incele</TextLink></div></section>
  </article>;
}

const initialRows = () => Array.from({ length: 3 }, () => ({ weight: "60", reps: "10" }));
function SessionInputs({ label, rows, onChange, onAdd, onRemove }) {
  return <fieldset className="fitness-session"><legend>{label}</legend><div className="fitness-set-heading" aria-hidden="true"><span>SET</span><span>AĞIRLIK (KG)</span><span>TEKRAR</span></div>{rows.map((row, index) => <div className="fitness-set-row" key={index}>
    <span className="mono">{String(index + 1).padStart(2, "0")}</span>
    <label><span className="fitness-sr">{label}, set {index + 1}, ağırlık kilogram</span><input type="number" inputMode="decimal" min="0" max="1000" step="any" value={row.weight} onChange={event => onChange(index, "weight", event.target.value)} /></label>
    <label><span className="fitness-sr">{label}, set {index + 1}, tekrar</span><input type="number" inputMode="numeric" min="1" max="200" step="1" value={row.reps} onChange={event => onChange(index, "reps", event.target.value)} /></label>
  </div>)}<div className="fitness-set-actions"><button type="button" onClick={onAdd} disabled={rows.length >= 10}>+ Set ekle</button><button type="button" onClick={onRemove} disabled={rows.length <= 1}>Son seti kaldır</button></div></fieldset>;
}

export function VolumeCalculator() {
  const [previous, setPrevious] = useState(initialRows);
  const [current, setCurrent] = useState(initialRows);
  const a = calculateVolume(previous), b = calculateVolume(current);
  const comparison = compareVolume(a, b);
  const update = (setter) => (index, key, value) => setter(rows => rows.map((row, i) => i === index ? { ...row, [key]: value } : row));
  return <>
    <PageIntro eyebrow="HACİM HESAPLAYICI" trail={[{href:"/fitness/",label:"Fitness rehberi"}]} title="Antrenman hacmi" accent="hesaplayıcı." description="Set × tekrar × ağırlık. İki karşılaştırılabilir kaydın tonajını hesapla; farklı tekrar veya ağırlıktaki setleri ayrı ayrı gir." />
    <section className="wrap fitness-calculator" aria-labelledby="calculator-heading"><div className="fitness-calculator-intro"><h2 id="calculator-heading">Kayıtlarını yan yana koy.</h2><p>Başlangıç değerleri yalnız örnektir, yük önerisi değildir. Aynı egzersizi ve aynı ağırlık tanımını kullan. Veriler yalnız bu sayfada tutulur; sayfayı yenileyince sıfırlanır.</p></div>
      <div className="fitness-sessions">{[["Önceki kayıt", previous, setPrevious], ["Yeni kayıt", current, setCurrent]].map(([label, rows, setter]) => <SessionInputs key={label} label={label} rows={rows} onChange={update(setter)} onAdd={() => setter(items => [...items, { weight: "", reps: "" }])} onRemove={() => setter(items => items.slice(0, -1))} />)}</div>
      <div className="fitness-results" role="status" aria-live="polite" aria-atomic="true">{comparison ? <><div><span>Önceki hacim yükü</span><strong>{format(a)} <small>kg</small></strong></div><div><span>Yeni hacim yükü</span><strong>{format(b)} <small>kg</small></strong></div><div><span>Tonaj farkı</span><strong>{comparison.difference > 0 ? "+" : ""}{format(comparison.difference)} <small>kg</small></strong><span>{comparison.percent === null ? "Önceki hacim 0: yüzde değişimi tanımsız." : `%${format(comparison.percent)} değişim`}</span></div></> : <p>Tüm setleri doldur: ağırlık 0–1.000 kg, tekrar 1–200 arasında tam sayı olmalı. Eksik veya geçersiz veriyle sonuç hesaplanmaz.</p>}</div>
      <button type="button" className="fitness-reset" onClick={() => { setPrevious(initialRows()); setCurrent(initialRows()); }}>Örnek değerlere sıfırla</button>
      <noscript>Hesaplama için JavaScript gerekir. Elle hesaplamak için aşağıdaki formülü kullanabilirsin.</noscript>
    </section>
    <section className="wrap fitness-prose fitness-tool-explanation"><h2>Hacim hesabı nasıl yapılır?</h2><p>Her set için ağırlık × tamamlanan tekrar hesaplanır; sonuçlar toplanır. Örneğin 50 × 10 + 50 × 9 + 45 × 10 = 1.400 kg hacim yüküdür. Aynı yük ve tekrardaki setlerde set sayısı × tekrar × ağırlık kısa yolu kullanılabilir.</p><h2>Yüzde değişimi nasıl okunur?</h2><p>(Yeni hacim − önceki hacim) / önceki hacim × 100. Önceki kayıt 1.500 kg, yeni kayıt 1.400 kg olduğunda yaklaşık −%6,7 çıkar. Önceki hacim sıfırsa yüzde hesaplanmaz. Görünen değerler tek ondalık basamağa yuvarlanır.</p><h2>Sonuç neyi söylemez?</h2><p>Tonaj farkı kas kazanımı, kalori veya sağlık puanı değildir. Farklı egzersizleri ve makineleri eşitlemez. Vücut ağırlığı veya destekli hareketlerde bu basit formül uygun olmayabilir. Dambılın tekini mi çiftini mi saydığını tutarlı biçimde belirt. Araç yalnız aritmetik hesap yapar, kişisel antrenman önermez.</p><TextLink href="/fitness/antrenman-hacmi/">Formülün sınırlarını ve örnekleri oku</TextLink><div className="fitness-product-note"><h2>Bir hesap değil, bir kayıt alışkanlığı.</h2><p>Stat Boost ile ağırlık, set ve tekrarlarını telefonda kaydedebilirsin. Bu web aracı uygulama hesabına bağlanmaz.</p><StoreLink /><TextLink href="/urunler/stat-boost/">Uygulamanın özelliklerini incele</TextLink></div><TextLink href="/fitness/">Tüm fitness rehberleri</TextLink></section>
  </>;
}
