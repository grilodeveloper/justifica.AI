import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Share2, RefreshCw, Check, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import type { ExcuseConfig } from "./ContextScreen";
import { generateCorporateExcuse, getAbsurdLevelLabel, getContextLabel } from "../lib/corporate-excuse-generator";
import { trackExcuseCopy, getCopyCount } from "../lib/usage-tracker";

interface ExcuseScreenProps {
  onBack: () => void;
  config: ExcuseConfig;
  onSave?: (excuse: string, config: ExcuseConfig) => void;
}

export function ExcuseScreen({ onBack, config, onSave }: ExcuseScreenProps) {
  const [excuse, setExcuse] = useState(() => generateCorporateExcuse(config));
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

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
        // User cancelled or error occurred
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  const handleRegenerate = () => {
    setExcuse(generateCorporateExcuse(config));
    toast.success("Nova desculpa gerada");
  };

  const handleSave = () => {
    if (onSave) {
      onSave(excuse, config);
      setSaved(true);
      toast.success("Salvo no histórico");
      setTimeout(() => setSaved(false), 2000);
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
          <div>
            <h2 className="text-[#1a1a1a]">Sua Desculpa</h2>
            <p className="text-[#737373] text-sm">Pronta para usar</p>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="border-[#e5e5e5] text-[#4a4a4a] bg-white">
            {getContextLabel(config.context)}
          </Badge>
          <Badge variant="outline" className="border-[#e5e5e5] text-[#4a4a4a] bg-white">
            Nível de absurdo: {getAbsurdLevelLabel(config.absurdLevel)}
          </Badge>
        </div>

        {/* Excuse Card */}
        <Card className="p-6 mb-6 bg-white border border-[#e5e5e5] shadow-sm">
          <p className="text-[#1a1a1a] text-base leading-relaxed">
            {excuse}
          </p>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="h-12 border-2 border-[#e5e5e5] hover:border-[#1a1a1a] hover:bg-white"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </>
            )}
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="h-12 border-2 border-[#e5e5e5] hover:border-[#1a1a1a] hover:bg-white"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleRegenerate}
            variant="outline"
            className="h-12 border-2 border-[#e5e5e5] hover:border-[#1a1a1a] hover:bg-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Gerar Outra
          </Button>
          <Button
            onClick={handleSave}
            variant="outline"
            className="h-12 border-2 border-[#e5e5e5] hover:border-[#1a1a1a] hover:bg-white"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Salvo
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 mr-2" />
                Salvar
              </>
            )}
          </Button>
        </div>

        {/* Tips */}
        <Card className="mt-6 p-4 bg-[#f5f5f5] border-0">
          <p className="text-xs text-[#737373] leading-relaxed">
            <strong className="text-[#4a4a4a]">Dica profissional:</strong> Para máxima credibilidade, 
            envie esta desculpa 15-30 minutos antes do horário agendado. 
            Evite explicações excessivas ou se desculpar demais.
          </p>
        </Card>
      </div>
    </div>
  );
}