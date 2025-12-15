import { useState, useEffect } from "react";
import { LandingScreen } from "./components/LandingScreen";
import { ContextScreen, type ExcuseConfig } from "./components/ContextScreen";
import { ExcuseScreen } from "./components/ExcuseScreen";
import { EmergencyScreen } from "./components/EmergencyScreen";
import { HistoryScreen } from "./components/HistoryScreen";
import { PaywallScreen } from "./components/PaywallScreen";
import { Button } from "./components/ui/button";
import { History } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { incrementUsage, getUsageStats, canGenerateExcuse } from "./lib/usage-tracker";

type Screen = "landing" | "context" | "excuse" | "emergency" | "history" | "paywall";

interface SavedExcuse {
  id: string;
  excuse: string;
  config: ExcuseConfig;
  timestamp: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [excuseConfig, setExcuseConfig] = useState<ExcuseConfig | null>(null);
  const [savedExcuses, setSavedExcuses] = useState<SavedExcuse[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load saved excuses from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("corporateExcuses");
    if (saved) {
      try {
        setSavedExcuses(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load saved excuses");
      }
    }
  }, []);

  // Save excuses to localStorage
  useEffect(() => {
    if (savedExcuses.length > 0) {
      localStorage.setItem("corporateExcuses", JSON.stringify(savedExcuses));
    }
  }, [savedExcuses]);

  const handleGenerateNow = () => {
    // Check if user can generate excuses
    if (!canGenerateExcuse()) {
      setCurrentScreen("paywall");
      return;
    }
    setCurrentScreen("context");
  };

  const handleEmergency = () => {
    // Check if user can generate excuses
    if (!canGenerateExcuse()) {
      setCurrentScreen("paywall");
      return;
    }
    
    // Increment usage counter for emergency excuses too
    incrementUsage();
    setCurrentScreen("emergency");
  };

  const handleBackToLanding = () => {
    setCurrentScreen("landing");
    setExcuseConfig(null);
    setRefreshKey(prev => prev + 1); // Force refresh of landing screen
  };

  const handleGenerate = (config: ExcuseConfig) => {
    // Increment usage counter when generating an excuse
    incrementUsage();
    setExcuseConfig(config);
    setCurrentScreen("excuse");
  };

  const handleLimitReached = () => {
    setCurrentScreen("paywall");
  };

  const handleSaveExcuse = (excuse: string, config: ExcuseConfig) => {
    const newExcuse: SavedExcuse = {
      id: Date.now().toString(),
      excuse,
      config,
      timestamp: Date.now(),
    };
    setSavedExcuses((prev) => [newExcuse, ...prev]);
  };

  const handleDeleteExcuse = (id: string) => {
    setSavedExcuses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenHistory = () => {
    setCurrentScreen("history");
  };

  return (
    <div className="relative w-full min-h-screen bg-[#fafafa]">
      {/* History Button - Shows on landing screen */}
      {currentScreen === "landing" && savedExcuses.length > 0 && (
        <Button
          onClick={handleOpenHistory}
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 rounded-full hover:bg-[#e5e5e5]"
        >
          <History className="w-5 h-5 text-[#1a1a1a]" />
        </Button>
      )}

      {/* Screen Routing */}
      {currentScreen === "landing" && (
        <LandingScreen
          onGenerateNow={handleGenerateNow}
          onEmergency={handleEmergency}
          onLimitReached={handleLimitReached}
          refreshKey={refreshKey}
        />
      )}

      {currentScreen === "context" && (
        <ContextScreen
          onBack={handleBackToLanding}
          onGenerate={handleGenerate}
          onLimitReached={handleLimitReached}
        />
      )}

      {currentScreen === "excuse" && excuseConfig && (
        <ExcuseScreen
          onBack={handleBackToLanding}
          config={excuseConfig}
          onSave={handleSaveExcuse}
        />
      )}

      {currentScreen === "emergency" && (
        <EmergencyScreen
          onBack={handleBackToLanding}
          onSave={handleSaveExcuse}
        />
      )}

      {currentScreen === "history" && (
        <HistoryScreen
          onBack={handleBackToLanding}
          savedExcuses={savedExcuses}
          onDelete={handleDeleteExcuse}
        />
      )}

      {currentScreen === "paywall" && (
        <PaywallScreen
          onBack={handleBackToLanding}
          dailyUsed={getUsageStats().daily}
          weeklyUsed={getUsageStats().weekly}
        />
      )}

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
}