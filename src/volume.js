export function calculateVolume(rows) {
  if (!rows.length) return null;
  let total = 0;
  for (const { weight, reps } of rows) {
    if (String(weight).trim() === "" || String(reps).trim() === "") return null;
    const w = Number(weight), r = Number(reps);
    if (!Number.isFinite(w) || !Number.isFinite(r) || w < 0 || w > 1000 || !Number.isInteger(r) || r < 1 || r > 200) return null;
    total += w * r;
  }
  return total;
}
export function compareVolume(previous, current) {
  if (previous === null || current === null) return null;
  return { difference: current - previous, percent: previous > 0 ? (current - previous) / previous * 100 : null };
}
