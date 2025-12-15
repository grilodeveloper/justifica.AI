import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Calendar, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
import { UsageCounter } from "./UsageCounter";
import { getUsageStats, canGenerateExcuse, type UsageStats } from "../lib/usage-tracker";

interface ContextScreenProps {
  onBack: () => void;
  onGenerate: (config: ExcuseConfig) => void;
  onLimitReached: () => void;
}

export interface ExcuseConfig {
  context: "absence" | "late" | "early";
  absurdLevel: number;
}

export function ContextScreen({ onBack, onGenerate, onLimitReached }: ContextScreenProps) {
  const [context, setContext] = useState<"absence" | "late" | "early" | null>(null);
  const [absurdLevel, setAbsurdLevel] = useState([3]);
  const [usageStats, setUsageStats] = useState<UsageStats>(getUsageStats());
  const [canGenerate, setCanGenerate] = useState(true);

  useEffect(() => {
    const stats = getUsageStats();
    setUsageStats(stats);
    setCanGenerate(canGenerateExcuse());
  }, []);

  const contexts = [
    {
      id: "absence" as const,
      label: "Ausência do Dia Inteiro",
      description: "Não posso comparecer ao trabalho hoje",
      icon: Calendar,
    },
    {
      id: "late" as const,
      label: "Chegada Atrasada",
      description: "Vou chegar mais tarde que o agendado",
      icon: Clock,
    },
    {
      id: "early" as const,
      label: "Saída Antecipada",
      description: "Preciso sair antes do fim do expediente",
      icon: LogOut,
    },
  ];

  const absurdLabels = [
    { level: 1, label: "Quase normal" },
    { level: 2, label: "Levemente incomum" },
    { level: 3, label: "Estranho mas aceitável" },
    { level: 4, label: "Altamente improvável" },
    { level: 5, label: "Completamente absurdo, dito seriamente" },
  ];

  const handleGenerate = () => {
    if (context) {
      if (!canGenerate) {
        onLimitReached();
        return;
      }
      onGenerate({ context, absurdLevel: absurdLevel[0] });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full hover:bg-[#e5e5e5]"
          >
            <ArrowLeft className="w-5 h-5 text-[#1a1a1a]" />
          </Button>
          <div>
            <h2 className="text-[#1a1a1a]">Configurar Desculpa</h2>
            <p className="text-[#737373] text-sm">Selecione o contexto e nível de absurdo</p>
          </div>
        </div>

        {/* Usage Counter */}
        <div className="mb-6">
          <UsageCounter stats={usageStats} />
        </div>

        {/* Context Selection */}
        <div className="mb-8">
          <label className="block text-sm text-[#4a4a4a] mb-3">
            Situação
          </label>
          <div className="space-y-3">
            {contexts.map((ctx) => (
              <Card
                key={ctx.id}
                onClick={() => setContext(ctx.id)}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  context === ctx.id
                    ? "border-[#1a1a1a] bg-white shadow-sm"
                    : "border-[#e5e5e5] bg-white hover:border-[#d4d4d4]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    context === ctx.id ? "bg-[#1a1a1a]" : "bg-[#f5f5f5]"
                  }`}>
                    <ctx.icon className={`w-6 h-6 ${
                      context === ctx.id ? "text-white" : "text-[#737373]"
                    }`} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#1a1a1a] mb-0.5">{ctx.label}</h4>
                    <p className="text-[#737373] text-sm">{ctx.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Absurdity Level */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm text-[#4a4a4a]">
              Nível de absurdo
            </label>
            <span className="text-sm text-[#1a1a1a] px-3 py-1 bg-white border border-[#e5e5e5] rounded-lg">
              {absurdLevel[0]}
            </span>
          </div>
          
          <Slider
            value={absurdLevel}
            onValueChange={setAbsurdLevel}
            min={1}
            max={5}
            step={1}
            className="mb-4 [&_[data-slot=slider-track]]:bg-[#e5e5e5] [&_[data-slot=slider-range]]:bg-[#1a1a1a] [&_[data-slot=slider-thumb]]:border-[#1a1a1a] [&_[data-slot=slider-thumb]]:bg-white"
          />
          
          <div className="space-y-2">
            {absurdLabels.map((item) => (
              <div
                key={item.level}
                className={`flex items-center gap-2 text-xs ${
                  absurdLevel[0] === item.level
                    ? "text-[#1a1a1a]"
                    : "text-[#a3a3a3]"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${
                  absurdLevel[0] === item.level ? "bg-[#1a1a1a]" : "bg-[#e5e5e5]"
                }`} />
                <span>{item.level} – {item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="fixed bottom-0 left-0 right-0 px-6 py-6 bg-gradient-to-t from-[#fafafa] via-[#fafafa] to-transparent">
          <div className="max-w-2xl mx-auto">
            {!canGenerate ? (
              <div className="mb-3">
                <Card className="p-4 bg-[#fef2f2] border border-[#fca5a5] mb-3">
                  <p className="text-sm text-[#dc2626] text-center">
                    Você atingiu seu limite gratuito. Faça upgrade para continuar gerando desculpas.
                  </p>
                </Card>
              </div>
            ) : null}
            <Button
              onClick={handleGenerate}
              disabled={!context || !canGenerate}
              className="w-full h-14 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!canGenerate ? "Fazer Upgrade para Continuar" : "Gerar desculpa"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}