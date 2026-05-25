export interface TasbeehItem {
  id: string;
  name: string;
  count: number;
  totalCount: number;
}

export const defaultTasbeehs: TasbeehItem[] = [
  { id: "dhikr_1", name: "سبحان الله", count: 0, totalCount: 0 },
  { id: "dhikr_2", name: "الحمد لله", count: 0, totalCount: 0 },
  { id: "dhikr_3", name: "الله أكبر", count: 0, totalCount: 0 },
  { id: "dhikr_4", name: "لا إله إلا الله", count: 0, totalCount: 0 },
  { id: "dhikr_5", name: "لا إله إلا أنت سبحانك إني كنت من الظالمين", count: 0, totalCount: 0 },
];

export function loadTasbeehs(): TasbeehItem[] {
  try {
    const stored = localStorage.getItem("athar_tasbeehs");
    if (stored) return JSON.parse(stored);
  } catch {}
  return [...defaultTasbeehs];
}

export function saveTasbeehs(items: TasbeehItem[]) {
  localStorage.setItem("athar_tasbeehs", JSON.stringify(items));
}
