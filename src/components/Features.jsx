import { motion } from 'framer-motion';
import { Sparkles, Code2, MonitorSmartphone, TrendingUp, Globe, Zap } from 'lucide-react';

const bentoItems = [
  {
    icon: <TrendingUp size={18} strokeWidth={2} />,
    title: 'Antrenman Analizi',
    meta: 'v1.0',
    desc: 'Yapay zeka destekli gelişim grafikleri ve ağırlık takibi.',
    status: 'Yakında',
    tags: ['İstatistik', 'Raporlar', 'Gelişim'],
    featured: true,
    iconColor: '#3b82f6',
    iconBg: 'rgba(59,130,246,0.15)',
  },
  {
    icon: <Sparkles size={18} strokeWidth={2} />,
    title: 'Sosyal Ekosistem',
    meta: 'Topluluk',
    desc: 'Arkadaşlarınızla antrenmanlarınızı paylaşın, liderlik tablosunda yarışın.',
    status: 'Güncel',
    tags: ['Sosyal', 'Motivasyon'],
    iconColor: '#10b981',
    iconBg: 'rgba(16,185,129,0.15)',
  },
  {
    icon: <Code2 size={18} strokeWidth={2} />,
    title: 'StatBoost Altyapısı',
    meta: 'Flutter & Dart',
    desc: 'En son teknolojilerle yazılmış, yüksek performanslı uygulama altyapısı.',
    tags: ['Kod', 'Performans'],
    iconColor: '#a855f7',
    iconBg: 'rgba(168,85,247,0.15)',
  },
  {
    icon: <MonitorSmartphone size={18} strokeWidth={2} />,
    title: 'Mobil Odaklı',
    meta: 'Android',
    desc: 'Telefon ve tabletlerde pixel-perfect çalışan modern arayüz tasarımı.',
    status: 'Aktif',
    tags: ['UI/UX', 'Mobile'],
    iconColor: '#0ea5e9',
    iconBg: 'rgba(14,165,233,0.15)',
  },
  {
    icon: <Globe size={18} strokeWidth={2} />,
    title: 'Google Play\'de',
    meta: 'Mağaza',
    desc: 'Uygulamamıza Android cihazlardan saniyeler içinde erişin ve hemen başlayın.',
    status: 'Lansman',
    tags: ['Dağıtım', 'Android'],
    iconColor: '#f59e0b',
    iconBg: 'rgba(245,158,11,0.15)',
  },
  {
    icon: <Zap size={18} strokeWidth={2} />,
    title: 'Etkileşimli Rehberler',
    meta: '3D Modeller',
    desc: 'Egzersizleri 3D animasyonlu görsellerle detaylı ve doğru şekilde öğrenin.',
    tags: ['3D', 'Egzersiz'],
    colSpan: 2,
    iconColor: '#ef4444',
    iconBg: 'rgba(239,68,68,0.15)',
  },
];

const cardStyle = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '1rem',
  backgroundColor: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.06)',
  padding: '1.5rem',
  transition: 'all 0.3s ease',
  cursor: 'default',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
};

const cardHoverStyle = {
  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  borderColor: 'rgba(255,255,255,0.12)',
  transform: 'translateY(-4px)',
};

export default function Features() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', backgroundColor: '#000' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', color: '#fff' }}>
            Öne Çıkan <span style={{ fontFamily: 'Playfair Display, serif' }}>Değerlerimiz</span>
          </h2>
          <p style={{ color: '#737373', fontSize: '1.1rem' }}>StatBoost ile antrenman deneyiminizi yeniden tanımlayın.</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
        }}>
          {bentoItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08, type: 'spring', stiffness: 120 }}
              whileHover={cardHoverStyle}
              style={{
                ...cardStyle,
                ...(item.featured ? { 
                  boxShadow: '0 0 0 1.5px rgba(59,130,246,0.4), 0 8px 30px rgba(59,130,246,0.08)',
                } : {}),
              }}
            >
              {/* Header: Icon + Status */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  backgroundColor: item.iconBg,
                  color: item.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {item.icon}
                </div>
                {item.status && (
                  <span style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#737373',
                    padding: '0.2rem 0.5rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '9999px',
                  }}>
                    {item.status}
                  </span>
                )}
              </div>

              {/* Title + Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{item.title}</h3>
                {item.meta && <span style={{ fontSize: '0.7rem', color: '#525252' }}>{item.meta}</span>}
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.8rem', color: '#737373', lineHeight: 1.6, marginBottom: item.tags ? '1rem' : 0 }}>
                {item.desc}
              </p>

              {/* Tags */}
              {item.tags && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {item.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: '0.6rem',
                      fontWeight: 500,
                      color: '#525252',
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
