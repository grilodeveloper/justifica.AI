import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Trash2, FileText, Clock, LogOut, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { trackExcuseCopy } from "../lib/usage-tracker";
import type { ExcuseConfig } from "./ContextScreen";

interface SavedExcuse {
  id: string;
  excuse: string;
  config: ExcuseConfig;
  timestamp: number;
}

interface HistoryScreenProps {
  onBack: () => void;
  savedExcuses: SavedExcuse[];
  onDelete: (id: string) => void;
}

export function HistoryScreen({ onBack, savedExcuses, onDelete }: HistoryScreenProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCopy = async (excuse: string) => {
    try {
      await navigator.clipboard.writeText(excuse);
      
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
    } catch (error) {
      toast.error("Falha ao copiar");
    }
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    toast.success("Desculpa excluída");
  };

  const getContextIcon = (context: string) => {
    switch (context) {
      case "absence":
        return Calendar;
      case "late":
        return Clock;
      case "early":
        return LogOut;
      default:
        return FileText;
    }
  };

  const getContextLabel = (context: string) => {
    const labels: Record<string, string> = {
      absence: "Ausência",
      late: "Chegada atrasada",
      early: "Saída antecipada",
    };
    return labels[context] || context;
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}min atrás`;
    } else if (diffHours < 24) {
      return `${diffHours}h atrás`;
    } else if (diffDays < 7) {
      return `${diffDays}d atrás`;
    } else {
      return date.toLocaleDateString('pt-BR');
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
            <h2 className="text-[#1a1a1a]">Desculpas Salvas</h2>
            <p className="text-[#737373] text-sm">
              {savedExcuses.length} {savedExcuses.length === 1 ? "desculpa salva" : "desculpas salvas"}
            </p>
          </div>
        </div>

        {/* Excuses List */}
        {savedExcuses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-[#f5f5f5] flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-[#a3a3a3]" strokeWidth={1.5} />
            </div>
            <p className="text-[#737373] text-center mb-2">Nenhuma desculpa salva ainda</p>
            <p className="text-[#a3a3a3] text-sm text-center max-w-xs">
              As desculpas geradas que você salvar aparecerão aqui para reutilização rápida
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedExcuses.map((item) => {
              const Icon = getContextIcon(item.config.context);
              const isExpanded = expandedId === item.id;
              const preview = item.excuse.substring(0, 80) + (item.excuse.length > 80 ? "..." : "");

              return (
                <Card
                  key={item.id}
                  className="bg-white border border-[#e5e5e5] overflow-hidden"
                >
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#4a4a4a]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="border-[#e5e5e5] text-[#4a4a4a] text-xs">
                            {getContextLabel(item.config.context)}
                          </Badge>
                          <span className="text-xs text-[#a3a3a3]">
                            {formatTimestamp(item.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-[#1a1a1a] leading-relaxed">
                          {isExpanded ? item.excuse : preview}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8 text-[#4a4a4a] hover:text-[#1a1a1a] hover:bg-[#f5f5f5]"
                      >
                        {isExpanded ? "Mostrar menos" : "Ler completa"}
                      </Button>
                      <Button
                        onClick={() => handleCopy(item.excuse)}
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8 text-[#4a4a4a] hover:text-[#1a1a1a] hover:bg-[#f5f5f5]"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copiar
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        variant="ghost"
                        size="sm"
                        className="text-xs h-8 text-[#dc2626] hover:text-[#b91c1c] hover:bg-[#fef2f2] ml-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}