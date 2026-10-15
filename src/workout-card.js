import { calculateVolume } from "./volume.js";

export const defaultCardRows = () => [
  { weight: "60", reps: "10" },
  { weight: "60", reps: "9" },
  { weight: "60", reps: "8" },
];
export function workoutCardData(title, rows) {
  const name = String(title).trim().slice(0, 36);
  const volume = calculateVolume(rows);
  if (!name || rows.length > 8 || volume === null) return null;
  return {
    title: name,
    rows: rows.map((row) => ({
      weight: Number(row.weight),
      reps: Number(row.reps),
    })),
    volume,
    sets: rows.length,
    reps: rows.reduce((total, row) => total + Number(row.reps), 0),
  };
}
export const cardNumber = (value) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(value);
