import { cardNumber } from "./workout-card.js";

// Called only on explicit download. No network, upload, account or storage.
export async function downloadWorkoutCard(data, theme) {
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");
  const accent = theme === "ice" ? "#9ce7ff" : "#c4f458";
  ctx.fillStyle = "#10140f";
  ctx.fillRect(0, 0, 1080, 1350);
  for (let y = 0; y < 1350; y += 54) {
    for (let x = 0; x < 1080; x += 54) {
      ctx.fillStyle = (x + y) % 108 === 0 ? "#20281c" : "#182015";
      ctx.fillRect(x, y, 2, 2);
    }
  }
  ctx.fillStyle = accent;
  ctx.fillRect(72, 72, 12, 36);
  const text = (value, x, y, size, color = "#f2f2ec", weight = 500) => {
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px "Manrope", sans-serif`;
    ctx.fillText(value, x, y);
  };
  text("FORGELABS / ANTRENMAN KARTI", 106, 100, 24, accent, 700);
  text("EMEĞİNİN", 72, 220, 80, "#f2f2ec", 800);
  text("BİR KAYDI VAR.", 72, 310, 80, accent, 800);
  let titleSize = 45;
  ctx.font = `600 ${titleSize}px "Manrope", sans-serif`;
  while (ctx.measureText(data.title).width > 936 && titleSize > 22) {
    titleSize -= 1;
    ctx.font = `600 ${titleSize}px "Manrope", sans-serif`;
  }
  text(data.title, 72, 405, titleSize, "#f2f2ec", 600);
  text(`${data.sets} SET  /  ${data.reps} TEKRAR`, 72, 455, 25, "#a6b19c");
  data.rows.forEach((row, index) => {
    const y = 525 + index * 56;
    ctx.fillStyle = "#25301f";
    ctx.fillRect(72, y - 29, 936, 1);
    text(String(index + 1).padStart(2, "0"), 75, y + 7, 23, accent);
    text(`${cardNumber(row.weight)} kg × ${row.reps}`, 190, y + 7, 27);
    const width = Math.max(
      4,
      ((row.weight * row.reps) /
        Math.max(...data.rows.map((set) => set.weight * set.reps), 1)) *
        310,
    );
    ctx.fillStyle = accent;
    ctx.fillRect(680, y - 16, width, 16);
  });
  ctx.fillStyle = accent;
  ctx.fillRect(72, 1045, 936, 2);
  text("HACİM YÜKÜ", 72, 1100, 23, "#a6b19c");
  text(`${cardNumber(data.volume)} kg`, 72, 1170, 62, accent, 800);
  text(
    "Kullanıcının girdiği kayıt · Doğrulanmış başarı belgesi değildir.",
    72,
    1240,
    20,
    "#a6b19c",
  );
  text("forgelabs.site  /  Stat Boost’u keşfet", 72, 1290, 23);
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) throw new Error("PNG generation failed");
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "forgelabs-antrenman-karti.png";
  document.body.append(link);
  link.click();
  link.remove();
  // Leave time for browsers to consume the blob; do not revoke before dispatch.
  window.setTimeout(() => URL.revokeObjectURL(url), 60000);
}
