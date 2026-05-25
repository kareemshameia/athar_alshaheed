import { useState } from "react";
import HomePage from "./pages/HomePage";
import PrayersPage from "./pages/PrayersPage";
import TasbeehPage from "./pages/TasbeehPage";
import DeedsPage from "./pages/DeedsPage";
import WirdPage from "./pages/WirdPage";
import MemorialPage from "./pages/MemorialPage";
import SettingsPage from "./pages/SettingsPage";

type Page = "home" | "prayers" | "tasbeeh" | "deeds" | "wird" | "memorial" | "settings";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const goHome = () => setPage("home");

  if (page === "prayers") return <PrayersPage onBack={goHome} />;
  if (page === "tasbeeh") return <TasbeehPage onBack={goHome} />;
  if (page === "deeds") return <DeedsPage onBack={goHome} />;
  if (page === "wird") return <WirdPage onBack={goHome} />;
  if (page === "memorial") return <MemorialPage onBack={goHome} />;
  if (page === "settings") return <SettingsPage onBack={goHome} />;

  return <HomePage onNavigate={(p) => setPage(p as Page)} />;
}
