export interface GoodDeed {
  id: string;
  title: string;
}

export const defaultDeeds: GoodDeed[] = [
  { id: "deed_1", title: "قراءة الفاتحة ووهب ثوابها للشهيد" },
  { id: "deed_2", title: "قراءة سورة الملك ووهب ثوابها للشهيد" },
  { id: "deed_3", title: "مئة تسبيحة واستغفار بنية الأجر له" },
  { id: "deed_4", title: "الصدقة المادية أو المعنوية كصدقة جارية للشهيد" },
  { id: "deed_5", title: "الدعاء للشهيد بالرحمة والمغفرة بظهر الغيب" },
  { id: "deed_6", title: "ركعتين نافلة بنية نيل رضا الله وإهداء الثواب للشهيد" },
];

export interface DeedState {
  id: string;
  title: string;
  completedCount: number;
  lastCompletedTimestamp: number;
}

export function loadDeeds(): DeedState[] {
  try {
    const stored = localStorage.getItem("athar_deeds");
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultDeeds.map(d => ({ ...d, completedCount: 0, lastCompletedTimestamp: 0 }));
}

export function saveDeeds(deeds: DeedState[]) {
  localStorage.setItem("athar_deeds", JSON.stringify(deeds));
}
