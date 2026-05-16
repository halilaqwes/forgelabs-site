import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { num: '01', title: 'Uygulamayı İndir', desc: 'Google Play Store üzerinden StatBoost Fitness\'ı ücretsiz indirin.' },
  { num: '02', title: 'Profilini Oluştur', desc: 'Kişisel hedeflerinizi belirleyin ve fiziksel metriklerinizi girin.' },
  { num: '03', title: 'Antrenmana Başla', desc: 'Size özel egzersiz planları ile spor salonunda veya evde sınırlarınızı zorlayın.' },
  { num: '04', title: 'Gelişimini Paylaş', desc: 'İlerleyişinizi takip edin ve başarılarınızı topluluğumuzla paylaşın.' }
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} style={{ padding: '8rem 0', background: '#050505', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
        
        <motion.div style={{ flex: '1 1 400px', y }} className="process-text">
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Fikirden <br/><span className="font-serif text-gradient">Gerçekliğe</span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.15rem', maxWidth: '400px' }}>
            Kolay kullanım ve güçlü özellikleri ile fitness hedeflerinize ulaşmak artık çok daha keyifli.
          </p>
        </motion.div>

        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              style={{ display: 'flex', gap: '2rem', paddingBottom: '2rem', borderBottom: index !== steps.length - 1 ? '1px solid var(--border)' : 'none' }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--muted)', fontFamily: 'Playfair Display, serif' }}>
                {step.num}
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--muted)' }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
