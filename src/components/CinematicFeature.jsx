"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicFeature() {
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const badge3Ref = useRef(null);
  const cardsRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      // Pin the section while we animate
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Phase 1: Title fades in and scales up
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 80, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
      );

      // Phase 2: Subtitle appears
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );

      // Phase 3: Phone slides up from below
      tl.fromTo(phoneRef.current,
        { opacity: 0, y: 300, rotateX: -25, scale: 0.7 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.5, ease: "power4.out" },
        "-=0.2"
      );

      // Phase 4: Title moves up & fades, phone centers
      tl.to(titleRef.current, { opacity: 0.15, y: -60, scale: 0.9, duration: 1 }, "+=0.3");
      tl.to(subtitleRef.current, { opacity: 0, y: -40, duration: 0.6 }, "<");

      // Phase 5: Floating badges appear one by one
      tl.fromTo(badge1Ref.current,
        { opacity: 0, x: -80, scale: 0.5 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
        "-=0.4"
      );
      tl.fromTo(badge2Ref.current,
        { opacity: 0, x: 80, scale: 0.5 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
        "-=0.5"
      );
      tl.fromTo(badge3Ref.current,
        { opacity: 0, y: 60, scale: 0.5 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
        "-=0.5"
      );

      // Phase 6: Bottom cards slide in
      tl.fromTo(cardsRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.3"
      );

      // Phase 7: Overlay dims everything as user scrolls away
      tl.to(overlayRef.current, { opacity: 0.6, duration: 1 }, "+=0.5");

      // Floating animation for badges (infinite)
      gsap.to([badge1Ref.current, badge2Ref.current, badge3Ref.current], {
        y: "+=12",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });

      // Counter animation
      const counter = { val: 0 };
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 30%",
        onEnter: () => {
          gsap.to(counter, {
            val: 248,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
              const el = document.querySelector(".cinematic-counter");
              if (el) el.textContent = Math.floor(counter.val);
            }
          });
        },
        once: true
      });

      // Progress ring animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 30%",
        onEnter: () => {
          gsap.to(".cinematic-ring", {
            strokeDashoffset: 20,
            duration: 2.5,
            ease: "power2.inOut"
          });
        },
        once: true
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "#000",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1200px",
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.08) 0%, transparent 60%)",
        pointerEvents: "none"
      }} />

      {/* Title - centered, big */}
      <div ref={titleRef} style={{
        position: "absolute", top: "15%", left: 0, right: 0, textAlign: "center",
        zIndex: 5, opacity: 0,
      }}>
        <h2 style={{
          fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 900, lineHeight: 1.05,
          color: "#fff", letterSpacing: "-0.03em",
          background: "linear-gradient(180deg, #ffffff 30%, #4a4a4a 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Kişisel Antrenörünüz,<br />Cebinizde.
        </h2>
      </div>

      {/* Subtitle */}
      <div ref={subtitleRef} style={{
        position: "absolute", top: "55%", left: 0, right: 0, textAlign: "center",
        zIndex: 5, opacity: 0,
      }}>
        <p style={{
          fontSize: "1.2rem", color: "#a3a3a3", maxWidth: "600px",
          margin: "0 auto", lineHeight: 1.7,
        }}>
          StatBoost Fitness ile antrenmanlarınızı takip edin, arkadaşlarınızla yarışın ve formunuzu koruyun.
        </p>
      </div>

      {/* Phone mockup - centered */}
      <div ref={phoneRef} style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 15, opacity: 0,
        transformStyle: "preserve-3d",
      }}>
        <div style={{
          width: "280px", height: "560px", borderRadius: "2.8rem",
          backgroundColor: "#111", border: "3px solid #222",
          padding: "6px", boxShadow: "0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(59,130,246,0.1)",
          position: "relative",
        }}>
          {/* Blue glow behind phone */}
          <div style={{
            position: "absolute", inset: "-20px",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            borderRadius: "3rem", pointerEvents: "none", zIndex: -1,
          }} />

          <div style={{
            width: "100%", height: "100%", backgroundColor: "#050914",
            borderRadius: "2.4rem", overflow: "hidden", padding: "1.2rem",
            display: "flex", flexDirection: "column",
          }}>
            {/* Dynamic Island */}
            <div style={{
              width: "5.5rem", height: "1.4rem", backgroundColor: "#000",
              borderRadius: "9999px", margin: "0 auto 1.5rem",
              border: "1px solid rgba(255,255,255,0.05)",
            }} />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <p style={{ fontSize: "0.6rem", color: "#60a5fa", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em" }}>ANTRENMAN</p>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#fff" }}>Günlük Hedef</h4>
              </div>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: "bold", fontSize: "0.75rem", color: "#fff",
              }}>HA</div>
            </div>

            {/* Progress Ring */}
            <div style={{ position: "relative", width: "140px", height: "140px", margin: "0 auto 1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                <circle cx="70" cy="70" r="55" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <circle className="cinematic-ring" cx="70" cy="70" r="55" fill="none" stroke="#3b82f6" strokeWidth="10" strokeDasharray="345" strokeDashoffset="345" strokeLinecap="round" />
              </svg>
              <div style={{ textAlign: "center", zIndex: 10 }}>
                <span className="cinematic-counter" style={{ fontSize: "2rem", fontWeight: 800, color: "#fff" }}>0</span>
                <p style={{ fontSize: "0.55rem", color: "rgba(147,197,253,0.5)", fontWeight: "bold", marginTop: "2px" }}>Yakılan Kalori</p>
              </div>
            </div>

            {/* Bottom widgets */}
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{
                backgroundColor: "rgba(255,255,255,0.03)", padding: "0.8rem 1rem",
                borderRadius: "0.8rem", border: "1px solid rgba(255,255,255,0.05)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: "0.7rem", color: "#a3a3a3" }}>Aylık Antrenman</span>
                <span style={{ fontSize: "0.7rem", fontWeight: "bold", color: "#fff" }}>24</span>
              </div>
              <div style={{
                backgroundColor: "#2563eb", padding: "0.8rem",
                borderRadius: "0.8rem", textAlign: "center",
                fontSize: "0.8rem", fontWeight: "bold", color: "#fff",
                boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
              }}>
                Antrenman Başlat
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badge 1 - Left */}
      <div ref={badge1Ref} style={{
        position: "absolute", top: "30%", left: "8%", zIndex: 25, opacity: 0,
        backgroundColor: "rgba(15,20,35,0.85)", backdropFilter: "blur(16px)",
        borderRadius: "1rem", padding: "0.9rem 1.1rem",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", gap: "0.7rem",
        boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
      }}>
        <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(59,130,246,0.3)" }}>
          <span style={{ fontSize: "1.1rem" }}>🚀</span>
        </div>
        <div>
          <p style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#fff" }}>StatBoost ile</p>
          <p style={{ fontSize: "0.6rem", color: "rgba(191,219,254,0.5)" }}>Hedeflerine Ulaş</p>
        </div>
      </div>

      {/* Floating Badge 2 - Right */}
      <div ref={badge2Ref} style={{
        position: "absolute", top: "35%", right: "8%", zIndex: 25, opacity: 0,
        backgroundColor: "rgba(15,20,35,0.85)", backdropFilter: "blur(16px)",
        borderRadius: "1rem", padding: "0.9rem 1.1rem",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", gap: "0.7rem",
        boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
      }}>
        <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(139,92,246,0.3)" }}>
          <span style={{ fontSize: "1.1rem" }}>💎</span>
        </div>
        <div>
          <p style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#fff" }}>Gelişmiş</p>
          <p style={{ fontSize: "0.6rem", color: "rgba(196,181,253,0.5)" }}>Antrenman Analizi</p>
        </div>
      </div>

      {/* Floating Badge 3 - Bottom */}
      <div ref={badge3Ref} style={{
        position: "absolute", bottom: "18%", left: "15%", zIndex: 25, opacity: 0,
        backgroundColor: "rgba(15,20,35,0.85)", backdropFilter: "blur(16px)",
        borderRadius: "1rem", padding: "0.9rem 1.1rem",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", gap: "0.7rem",
        boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
      }}>
        <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(16,185,129,0.3)" }}>
          <span style={{ fontSize: "1.1rem" }}>⚡</span>
        </div>
        <div>
          <p style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#fff" }}>Sosyal</p>
          <p style={{ fontSize: "0.6rem", color: "rgba(167,243,208,0.5)" }}>Liderlik Tablosu</p>
        </div>
      </div>

      {/* Bottom info cards */}
      <div ref={cardsRef} style={{
        position: "absolute", bottom: "5%", left: "50%", transform: "translateX(-50%)",
        zIndex: 20, opacity: 0, display: "flex", gap: "1rem",
      }}>
        <div style={{
          backgroundColor: "rgba(255,255,255,0.03)", padding: "1.2rem 1.5rem",
          borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)", minWidth: "180px",
        }}>
          <h4 style={{ fontWeight: "bold", fontSize: "0.85rem", marginBottom: "0.3rem", color: "#fff" }}>Gelişmiş Takip</h4>
          <p style={{ color: "#737373", fontSize: "0.7rem" }}>Tüm kas gruplarını takip et.</p>
        </div>
        <div style={{
          backgroundColor: "rgba(255,255,255,0.03)", padding: "1.2rem 1.5rem",
          borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)", minWidth: "180px",
        }}>
          <h4 style={{ fontWeight: "bold", fontSize: "0.85rem", marginBottom: "0.3rem", color: "#fff" }}>Sosyal Medya</h4>
          <p style={{ color: "#737373", fontSize: "0.7rem" }}>Arkadaşlarınla paylaş.</p>
        </div>
        <div style={{
          backgroundColor: "rgba(255,255,255,0.03)", padding: "1.2rem 1.5rem",
          borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)", minWidth: "180px",
        }}>
          <h4 style={{ fontWeight: "bold", fontSize: "0.85rem", marginBottom: "0.3rem", color: "#fff" }}>3D Modeller</h4>
          <p style={{ color: "#737373", fontSize: "0.7rem" }}>Egzersizleri 3D gör.</p>
        </div>
      </div>

      {/* Fade overlay for exit */}
      <div ref={overlayRef} style={{
        position: "absolute", inset: 0, backgroundColor: "#000",
        opacity: 0, zIndex: 30, pointerEvents: "none",
      }} />
    </section>
  );
}
