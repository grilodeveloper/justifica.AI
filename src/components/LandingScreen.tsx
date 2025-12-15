import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Zap, FileText } from "lucide-react";
import { UsageCounter } from "./UsageCounter";
import { getUsageStats, canGenerateExcuse, type UsageStats } from "../lib/usage-tracker";

interface LandingScreenProps {
  onGenerateNow: () => void;
  onEmergency: () => void;
  onLimitReached?: () => void;
  refreshKey?: number;
}

export function LandingScreen({ onGenerateNow, onEmergency, onLimitReached, refreshKey }: LandingScreenProps) {
  const [usageStats, setUsageStats] = useState<UsageStats>(getUsageStats());
  const [canGenerate, setCanGenerate] = useState(true);

  useEffect(() => {
    // Update usage stats when landing screen is shown or refreshKey changes
    const stats = getUsageStats();
    setUsageStats(stats);
    setCanGenerate(canGenerateExcuse());
  }, [refreshKey]);

  const handleGenerateNow = () => {
    if (!canGenerate && onLimitReached) {
      onLimitReached();
      return;
    }
    onGenerateNow();
  };
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        {/* Usage Counter - Top */}
        <div className="w-full max-w-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <UsageCounter stats={usageStats} />
        </div>

        {/* Logo/Icon */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] flex items-center justify-center shadow-sm">
            <FileText className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[#1a1a1a] text-center mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          justifica.AI
        </h1>

        {/* Tagline */}
        <p className="text-[#737373] text-center text-lg mb-12 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Desculpas profissionais.<br />Geradas em segundos.
        </p>

        {/* Primary CTA */}
        {!canGenerate && (
          <div className="w-full max-w-sm mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Card className="p-4 bg-[#fef2f2] border border-[#fca5a5]">
              <p className="text-sm text-[#dc2626] text-center">
                Você atingiu seu limite gratuito. Faça upgrade para continuar gerando desculpas.
              </p>
            </Card>
          </div>
        )}
        <Button
          onClick={handleGenerateNow}
          className="w-full max-w-sm h-14 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-xl mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 shadow-sm hover:shadow-md"
        >
          {!canGenerate ? "Fazer Upgrade para Continuar" : "Gerar desculpa agora"}
        </Button>

        {/* Secondary CTA */}
        <Button
          onClick={onEmergency}
          variant="outline"
          className="w-full max-w-sm h-14 border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400"
        >
          <Zap className="w-4 h-4 mr-2" />
          Desculpa emergencial (1 toque)
        </Button>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8">
        <p className="text-center text-xs text-[#a3a3a3]">
          Apenas para fins de entretenimento. Use com responsabilidade.
        </p>
      </div>
    </div>
  );
}