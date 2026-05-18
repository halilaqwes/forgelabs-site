import { motion } from 'framer-motion';
import { X, Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
    }}>
      {/* Backdrop click close */}
      <div 
        onClick={onClose} 
        style={{
          position: 'absolute',
          inset: 0,
          cursor: 'pointer',
        }} 
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          maxHeight: '85vh',
          background: 'rgba(10, 10, 10, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          boxShadow: '0 24px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 2100,
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Shield size={20} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                Gizlilik Politikası
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>
                Son Güncelleme: 19 Mayıs 2026
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--muted)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div style={{
          padding: '2rem',
          overflowY: 'auto',
          flex: 1,
          lineHeight: '1.7',
          color: 'rgba(255, 255, 255, 0.75)',
          fontSize: '0.95rem',
        }} className="custom-scrollbar">
          <p style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', fontWeight: 500 }}>
            Forge Labs ("biz", "bizim" veya "bize") olarak gizliliğinize büyük önem veriyoruz. Bu Gizlilik Politikası, amiral gemisi uygulamamız <strong>StatBoost Fitness</strong> mobil uygulamasını ve ilişkili hizmetlerimizi kullanırken kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '16px',
              padding: '1.25rem',
            }}>
              <Lock size={20} style={{ color: '#fff', marginBottom: '0.5rem' }} />
              <h4 style={{ color: '#fff', marginBottom: '0.25rem', fontSize: '0.95rem' }}>Güvenli Depolama</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Tüm verileriniz modern şifreleme standartları ile korunmaktadır.</p>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '16px',
              padding: '1.25rem',
            }}>
              <Eye size={20} style={{ color: '#fff', marginBottom: '0.5rem' }} />
              <h4 style={{ color: '#fff', marginBottom: '0.25rem', fontSize: '0.95rem' }}>Şeffaf Veri Kullanımı</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Hangi veriyi neden topladığımızı her zaman açıkça biliyorsunuz.</p>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '16px',
              padding: '1.25rem',
            }}>
              <FileText size={20} style={{ color: '#fff', marginBottom: '0.5rem' }} />
              <h4 style={{ color: '#fff', marginBottom: '0.25rem', fontSize: '0.95rem' }}>Kontrol Sizde</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>İstediğiniz zaman verilerinizi indirebilir veya silebilirsiniz.</p>
            </div>
          </div>

          <h4 style={{ color: '#fff', marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>1. Hangi Bilgileri Topluyoruz?</h4>
          <p style={{ marginBottom: '1rem' }}>
            StatBoost Fitness uygulamasını kullanırken aşağıdaki bilgileri toplayabiliriz:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Hesap Bilgileri:</strong> Kayıt sırasında sağladığınız ad, e-posta adresi, profil fotoğrafı ve kullanıcı adı.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Fitness ve Sağlık Verileri:</strong> Ağırlık takipleri, antrenman günlükleri, set, tekrar ve süre bilgileri ile kişisel fitness hedefleri.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Sosyal İçerikler:</strong> Platform üzerinde paylaştığınız antrenman postları, topluluk yorumları ve beğeniler.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Cihaz Bilgileri:</strong> Uygulama performansını iyileştirmek adına IP adresi, işletim sistemi sürümü ve analitik tanımlayıcılar.</li>
          </ul>

          <h4 style={{ color: '#fff', marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>2. Bilgilerinizi Nasıl Kullanıyoruz?</h4>
          <p style={{ marginBottom: '1rem' }}>
            Topladığımız veriler, size daha kaliteli bir hizmet sunmak amacıyla şu amaçlarla kullanılır:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Kişisel fitness ilerlemenizi grafikler ve istatistikler halinde görselleştirmek.</li>
            <li style={{ marginBottom: '0.5rem' }}>Sosyal medya platformumuz üzerinden diğer sporcularla etkileşime geçmenizi sağlamak.</li>
            <li style={{ marginBottom: '0.5rem' }}>Hata raporlarını analiz ederek uygulama stabilitesini artırmak ve yeni özellikler geliştirmek.</li>
            <li style={{ marginBottom: '0.5rem' }}>Güvenlik ihlallerini tespit etmek ve platformun güvenliğini korumak.</li>
          </ul>

          <h4 style={{ color: '#fff', marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>3. Veri Paylaşımı ve Üçüncü Taraflar</h4>
          <p style={{ marginBottom: '1.5rem' }}>
            Forge Labs, kişisel verilerinizi asla üçüncü taraflara satmaz veya pazarlama amacıyla kiralamaz. Verileriniz, yalnızca uygulamanın temel işlevlerini (örneğin güvenli bulut depolama için veri tabanı sağlayıcıları) yerine getirebilmek adına güvenilir altyapı ortaklarımızla şifrelenmiş olarak paylaşılır.
          </p>

          <h4 style={{ color: '#fff', marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>4. Veri Güvenliği</h4>
          <p style={{ marginBottom: '1.5rem' }}>
            Verilerinizin yetkisiz erişim, değiştirme veya ifşaya karşı korunması için endüstri standardı TLS/SSL şifreleme yöntemlerini ve güvenli sunucu protokollerini kullanıyoruz. Ancak, internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olmadığını hatırlatmak isteriz.
          </p>

          <h4 style={{ color: '#fff', marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>5. Kullanıcı Hakları ve İletişim</h4>
          <p style={{ marginBottom: '1rem' }}>
            Kişisel verileriniz üzerinde tam kontrol sahibisiniz. İstediğiniz zaman:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Hesap bilgilerinizi güncelleyebilir veya profilinizi silebilirsiniz.</li>
            <li style={{ marginBottom: '0.5rem' }}>Toplanan verilerinizin bir kopyasını talep edebilirsiniz.</li>
            <li style={{ marginBottom: '0.5rem' }}>Veri işleme izinlerinizi sınırlandırabilirsiniz.</li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>
            Sorularınız veya talepleriniz için bizimle <strong>contact@forgelabs.com</strong> adresi üzerinden iletişime geçebilirsiniz.
          </p>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.25rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'rgba(5, 5, 5, 0.4)',
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '100px',
              padding: '0.6rem 2rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Anladım
          </button>
        </div>
      </motion.div>

      {/* Embedded CSS style rules for scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
