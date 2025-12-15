import { ArrowLeft, Check, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner@2.0.3";

interface PaywallScreenProps {
  onBack: () => void;
  dailyUsed: number;
  weeklyUsed: number;
}

export function PaywallScreen({ onBack, dailyUsed, weeklyUsed }: PaywallScreenProps) {
  const handleUpgrade = (plan: "weekly" | "monthly") => {
    toast.info(`Upgrade para plano ${plan === "weekly" ? "semanal" : "mensal"} - Integração de pagamento seria implementada aqui`, {
      duration: 3000
    });
  };

  const handleReset = () => {
    // Reset usage stats for demo purposes
    localStorage.removeItem("excuseUsageStats");
    localStorage.removeItem("excuseCopyTracker");
    toast.success("Uso reiniciado! Você pode usar o app novamente.", {
      duration: 3000
    });
    setTimeout(() => {
      onBack();
    }, 500);
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
            <h2 className="text-[#1a1a1a]">Upgrade Necessário</h2>
            <p className="text-[#737373] text-sm">Você atingiu seu limite gratuito</p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a1a1a] rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-[#1a1a1a] mb-3">
            Parece que você tem precisado de muitas desculpas
          </h1>
          <p className="text-[#737373] max-w-md mx-auto">
            Você usou <strong>{dailyUsed} desculpas hoje</strong> e{" "}
            <strong>{weeklyUsed} esta semana</strong>. Para continuar gerando desculpas profissionais, 
            faça upgrade do seu plano.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="space-y-4 mb-8">
          {/* Weekly Plan */}
          <Card className="p-6 bg-white border-2 border-[#e5e5e5] hover:border-[#1a1a1a] transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[#1a1a1a] mb-1">Passe Semanal</h3>
                <p className="text-[#737373] text-sm">Perfeito para necessidades ocasionais</p>
              </div>
              <div className="text-right">
                <div className="text-[#1a1a1a]">R$ 19,90</div>
                <div className="text-[#737373] text-xs">por semana</div>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-[#4a4a4a]">
                <Check className="w-4 h-4 text-[#1a1a1a]" />
                <span>Geração ilimitada de desculpas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#4a4a4a]">
                <Check className="w-4 h-4 text-[#1a1a1a]" />
                <span>Todos os níveis de absurdo</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#4a4a4a]">
                <Check className="w-4 h-4 text-[#1a1a1a]" />
                <span>Salvar favoritas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#4a4a4a]">
                <Check className="w-4 h-4 text-[#1a1a1a]" />
                <span>7 dias de acesso</span>
              </div>
            </div>
            <Button
              onClick={() => handleUpgrade("weekly")}
              className="w-full h-12 bg-white border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all"
            >
              Obter Passe Semanal
            </Button>
          </Card>

          {/* Monthly Plan - Recommended */}
          <Card className="p-6 bg-[#1a1a1a] border-2 border-[#1a1a1a] relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="bg-white text-[#1a1a1a] text-xs px-3 py-1 rounded-full">
                Melhor Valor
              </div>
            </div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white mb-1">Plano Mensal</h3>
                <p className="text-[#a3a3a3] text-sm">Para o criador serial de desculpas</p>
              </div>
              <div className="text-right">
                <div className="text-white">R$ 49,90</div>
                <div className="text-[#a3a3a3] text-xs">por mês</div>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-[#d4d4d4]">
                <Check className="w-4 h-4 text-white" />
                <span>Geração ilimitada de desculpas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#d4d4d4]">
                <Check className="w-4 h-4 text-white" />
                <span>Todos os níveis de absurdo</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#d4d4d4]">
                <Check className="w-4 h-4 text-white" />
                <span>Desculpas salvas ilimitadas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#d4d4d4]">
                <Check className="w-4 h-4 text-white" />
                <span>30 dias de acesso</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#d4d4d4]">
                <Check className="w-4 h-4 text-white" />
                <span className="font-medium">Suporte prioritário</span>
              </div>
            </div>
            <Button
              onClick={() => handleUpgrade("monthly")}
              className="w-full h-12 bg-white text-[#1a1a1a] hover:bg-[#e5e5e5]"
            >
              Fazer upgrade e continuar
            </Button>
          </Card>
        </div>

        {/* Secondary CTA */}
        <div className="text-center mb-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-[#737373] hover:text-[#1a1a1a] hover:bg-transparent"
          >
            Talvez mais tarde
          </Button>
        </div>

        {/* Demo Reset Button */}
        <div className="text-center mb-8">
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="text-xs border-[#e5e5e5] text-[#737373] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
          >
            <RotateCcw className="w-3 h-3 mr-2" />
            Reiniciar para demonstração
          </Button>
        </div>

        {/* Footer Note */}
        <Card className="mt-8 p-4 bg-[#f5f5f5] border-0">
          <p className="text-xs text-[#737373] text-center leading-relaxed">
            Todos os planos incluem acesso instantâneo e podem ser cancelados a qualquer momento. 
            Os preços são exibidos em BRL. Nenhum compromisso de longo prazo necessário.
          </p>
        </Card>
      </div>
    </div>
  );
}