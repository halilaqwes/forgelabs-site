import { useEffect, useRef } from "react";
import { useMotionSettings } from "../motion-settings";
import { ForgeMark } from "../ui";

// Original ForgeLabs canvas artwork. Fixed seed, bounded DPR/particle count,
// capped frame rate and visibility-aware scheduling keep mobile costs bounded.
export default function ForgeField({
  mode = "forge",
  burst = 0,
  className = "",
}) {
  const canvasRef = useRef(null);
  const hostRef = useRef(null);
  const kick = useRef(0);
  const activeMode = useRef(mode);
  const redraw = useRef(null);
  const { paused, reduced } = useMotionSettings();
  useEffect(() => {
    kick.current = burst ? 1 : 0;
  }, [burst]);
  useEffect(() => {
    activeMode.current = mode;
    redraw.current?.();
  }, [mode]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 1,
      height = 1,
      frame = 0,
      visible = true,
      last = 0,
      time = 0;
    let rotation = { x: -0.15, y: 0.35 },
      pointer = { x: 0, y: 0 };
    const mask = [
      "111111111",
      "111111111",
      "111000000",
      "111000000",
      "111111100",
      "111111100",
      "111000000",
      "111000000",
      "111000000",
      "111000000",
    ];
    const seed = (n) => (Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1;
    const points = [];
    for (let z = 0; z < 3; z++)
      for (let y = 0; y < mask.length; y++)
        for (let x = 0; x < mask[y].length; x++)
          if (mask[y][x] === "1")
            points.push({
              x: x - 4,
              y: y - 4.5,
              z: z - 1,
              px: x - 4,
              py: y - 4.5,
              pz: z - 1,
              vx: 0,
              vy: 0,
              vz: 0,
              seed: Math.abs(seed(points.length + 1)),
            });
    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };
    const project = (x, y, z) => {
      const cy = Math.cos(rotation.y),
        sy = Math.sin(rotation.y),
        cx = Math.cos(rotation.x),
        sx = Math.sin(rotation.x);
      const rx = x * cy + z * sy,
        rz = -x * sy + z * cy;
      const ry = y * cx - rz * sx,
        depth = y * sx + rz * cx;
      const perspective = 26 / (26 + depth);
      const scale = Math.min(width / 15, height / 15);
      return {
        x: width * 0.5 + rx * scale * perspective,
        y: height * 0.45 + ry * scale * perspective,
        depth,
        scale: scale * perspective,
      };
    };
    const draw = (dt) => {
      const fieldMode = activeMode.current;
      time += dt;
      rotation.x += (-0.15 + pointer.y * 0.25 - rotation.x) * 0.045;
      rotation.y +=
        (0.35 + pointer.x * 0.65 + Math.sin(time * 0.25) * 0.12 - rotation.y) *
        0.045;
      kick.current *= 0.95;
      ctx.clearRect(0, 0, width, height);
      const glow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.48,
        0,
        width * 0.5,
        height * 0.48,
        width * 0.52,
      );
      glow.addColorStop(0, "rgba(151,206,66,0.13)");
      glow.addColorStop(1, "rgba(151,206,66,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width * 0.5, height * 0.82);
      ctx.scale(1, 0.17);
      const shadow = ctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.29);
      shadow.addColorStop(0, "rgba(143,197,62,0.18)");
      shadow.addColorStop(1, "rgba(143,197,62,0)");
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.arc(0, 0, width * 0.29, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = "rgba(168,210,104,0.16)";
      ctx.lineWidth = 0.7;
      for (let r = 0; r < 3; r++) {
        ctx.beginPath();
        ctx.ellipse(
          width * 0.5,
          height * 0.47,
          width * (0.33 + r * 0.065),
          height * (0.33 + r * 0.026),
          -0.5 + r * 0.48,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }
      const rendered = points
        .map((point, i) => {
          let { x, y, z } = point;
          if (fieldMode === "wave") {
            x = ((i % 20) - 9.5) * 0.7;
            z = (Math.floor(i / 20) - 4) * 0.9;
            y =
              Math.sin(x * 0.7 + time * 1.5) * 1.8 +
              Math.cos(z * 0.7 + time) * 1.4;
          }
          if (fieldMode === "orbit") {
            const angle = i * 2.39996 + time * 0.13;
            const radius = 4.7 * Math.sqrt(i / points.length);
            x = Math.cos(angle) * radius;
            z = Math.sin(angle) * radius;
            y = Math.sin(angle * 2 + time) * 2;
          }
          const scatter = kick.current * 13;
          x += Math.sin(i * 4.2) * scatter;
          y += Math.cos(i * 3.1) * scatter;
          z += Math.sin(i * 2.7) * scatter;
          if (!paused && !reduced) y += Math.sin(time * 0.8) * 0.16;
          if (paused || reduced) {
            point.px = x;
            point.py = y;
            point.pz = z;
            point.vx = 0;
            point.vy = 0;
            point.vz = 0;
          } else {
            point.vx = (point.vx + (x - point.px) * 0.075) * 0.78;
            point.vy = (point.vy + (y - point.py) * 0.075) * 0.78;
            point.vz = (point.vz + (z - point.pz) * 0.075) * 0.78;
            point.px += point.vx;
            point.py += point.vy;
            point.pz += point.vz;
          }
          return { ...project(point.px, point.py, point.pz), seed: point.seed };
        })
        .sort((a, b) => b.depth - a.depth);
      for (const p of rendered) {
        const size = Math.max(2, p.scale * 0.56);
        const alpha =
          Math.max(0.18, Math.min(1, 0.65 - p.depth * 0.055)) *
          (0.85 + p.seed * 0.15);
        const scan = Math.abs(p.y / height - ((time * 0.12) % 1)) < 0.035;
        ctx.fillStyle = scan
          ? `rgba(238,255,202,${alpha})`
          : `rgba(${fieldMode === "wave" ? "112,220,206" : fieldMode === "orbit" ? "185,156,255" : "183,232,96"},${alpha})`;
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
        ctx.fillStyle = `rgba(245,255,215,${alpha * 0.45})`;
        ctx.fillRect(
          p.x - size / 2,
          p.y - size / 2,
          size,
          Math.max(1, size * 0.14),
        );
        ctx.fillStyle = "rgba(0,0,0,0.22)";
        ctx.fillRect(p.x + size * 0.2, p.y - size / 2, size * 0.3, size);
      }
      for (let i = 0; i < 16; i++) {
        const a = i * 2.399 + time * (i % 2 ? 0.08 : -0.05);
        const x = width * 0.5 + Math.cos(a) * width * (0.32 + (i % 3) * 0.04);
        const y = height * 0.47 + Math.sin(a) * height * 0.36;
        ctx.fillStyle = i % 3 ? "#b7d68666" : "#d3ff8d";
        ctx.fillRect(x, y, i % 3 ? 2 : 4, i % 3 ? 2 : 4);
      }
      canvas.dataset.ready = "true";
    };
    redraw.current = () => draw(0);
    const animate = (timestamp) => {
      frame = 0;
      if (!visible || document.hidden || paused || reduced) return;
      if (timestamp - last >= 32) {
        draw(Math.min((timestamp - last) / 1000, 0.05));
        last = timestamp;
      }
      frame = requestAnimationFrame(animate);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (visible && !document.hidden && !paused && !reduced) {
        last = performance.now();
        frame = requestAnimationFrame(animate);
      } else draw(0);
    };
    const move = (event) => {
      if (event.pointerType === "touch") return;
      const box = host.getBoundingClientRect();
      pointer = {
        x: (event.clientX - box.left) / box.width - 0.5,
        y: (event.clientY - box.top) / box.height - 0.5,
      };
    };
    const leave = () => {
      pointer = { x: 0, y: 0 };
    };
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      schedule();
    });
    const resizer = new ResizeObserver(resize);
    observer.observe(host);
    resizer.observe(host);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", schedule);
    resize();
    schedule();
    return () => {
      redraw.current = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizer.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [paused, reduced]);
  return (
    <div ref={hostRef} className={`forge-field ${className}`}>
      <div className="forge-field-fallback" aria-hidden="true">
        <ForgeMark />
      </div>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="field-axis axis-horizontal" />
      <div className="field-axis axis-vertical" />
      <span className="field-corner corner-tl">+</span>
      <span className="field-corner corner-br">+</span>
    </div>
  );
}
