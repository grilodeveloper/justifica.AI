import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Share2, Zap, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { generateCorporateExcuse, getContextLabel } from "../lib/corporate-excuse-generator";
import { trackExcuseCopy } from "../lib/usage-tracker";
import type { ExcuseConfig } from "./ContextScreen";

interface EmergencyScreenProps {
  onBack: () => void;
  onSave?: (excuse: string, config: ExcuseConfig) => void;
}

export function EmergencyScreen({ onBack, onSave }: EmergencyScreenProps) {
  const [excuse, setExcuse] = useState("");
  const [config, setConfig] = useState<ExcuseConfig | null>(null);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(true);

  useEffect(() => {
    // Simulate quick generation with random context
    const contexts: Array<"absence" | "late" | "early"> = ["absence", "late", "early"];
    const randomContext = contexts[Math.floor(Math.random() * contexts.length)];
    const randomLevel = Math.floor(Math.random() * 3) + 2; // Level 2-4 for emergency

    const newConfig: ExcuseConfig = {
      context: randomContext,
      absurdLevel: randomLevel,
    };

    setTimeout(() => {
      const generatedExcuse = generateCorporateExcuse(newConfig);
      setExcuse(generatedExcuse);
      setConfig(newConfig);
      setGenerating(false);
    }, 800);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(excuse);
      setCopied(true);
      
      // Track this copy and check for duplicates
      const copyCount = trackExcuseCopy(excuse);
      
      if (copyCount >= 2) {
        toast.error(
          "Você já usou esta desculpa mais de uma vez.",
          {
            duration: 4000,
            description: "Considere gerar uma nova desculpa para manter a credibilidade."
          }
        );
      } else {
        toast.success("Copiado para área de transferência");
      }
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Falha ao copiar");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: excuse,
        });
        toast.success("Compartilhado com sucesso");
      } catch (error) {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  const handleSave = () => {
    if (onSave && config) {
      onSave(excuse, config);
      toast.success("Salvo no histórico");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-2xl mx-auto px-6 py-8 pb-32">
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
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#1a1a1a]" />
              <h2 className="text-[#1a1a1a]">Modo Emergência</h2>
            </div>
            <p className="text-[#737373] text-sm">Sem tempo para pensar. Fizemos por você.</p>
          </div>
        </div>

        {generating ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#e5e5e5] border-t-[#1a1a1a] rounded-full animate-spin mb-4" />
            <p className="text-[#737373] text-sm">Gerando desculpa...</p>
          </div>
        ) : (
          <>
            {/* Metadata */}
            {config && (
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="border-[#e5e5e5] text-[#4a4a4a] bg-white">
                  {getContextLabel(config.context)}
                </Badge>
                <Badge variant="outline" className="border-[#e5e5e5] text-[#4a4a4a] bg-white">
                  Gerado automaticamente
                </Badge>
              </div>
            )}

            {/* Excuse Card */}
            <Card className="p-6 mb-6 bg-white border border-[#e5e5e5] shadow-sm">
              <p className="text-[#1a1a1a] text-base leading-relaxed">
                {excuse}
              </p>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleCopy}
                className="w-full h-14 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-xl"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copiar e fechar
                  </>
                )}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="h-12 border-2 border-[#e5e5e5] hover:border-[#1a1a1a] hover:bg-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
                <Button
                  onClick={handleSave}
                  variant="outline"
                  className="h-12 border-2 border-[#e5e5e5] hover:border-[#1a1a1a] hover:bg-white"
                >
                  Salvar
                </Button>
              </div>
            </div>

            {/* Emergency Tips */}
            <Card className="mt-6 p-4 bg-[#fff9e6] border border-[#ffd700]/20">
              <p className="text-xs text-[#666] leading-relaxed">
                <strong className="text-[#4a4a4a]">⚡ Conselho emergencial:</strong> Envie 
                imediatamente. Não pense demais. As melhores desculpas são entregues com 
                confiança e explicação mínima.
              </p>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}