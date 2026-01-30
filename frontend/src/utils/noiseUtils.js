export function getComfortLabel(db) {
  if (db < 30) return "😌 Very Quiet – Comfortable";
  if (db < 60) return "🙂 Normal Public Sound";
  if (db < 75) return "😐 Loud – May Feel Tiring";
  if (db < 90) return "😣 Very Loud – Stressful";
  return "⚠️ Harmful If Prolonged";
}
