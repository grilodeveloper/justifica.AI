import { TrendingUp, AlertCircle } from "lucide-react";
import { Card } from "./ui/card";
import { FREE_LIMITS, type UsageStats } from "../lib/usage-tracker";

interface UsageCounterProps {
  stats: UsageStats;
  variant?: "default" | "warning" | "critical";
}

export function UsageCounter({ stats, variant = "default" }: UsageCounterProps) {
  const dailyRemaining = Math.max(0, FREE_LIMITS.dailyLimit - stats.daily);
  const weeklyRemaining = Math.max(0, FREE_LIMITS.weeklyLimit - stats.weekly);
  
  const isWarning = dailyRemaining <= 1 || weeklyRemaining <= 2;
  const isCritical = dailyRemaining === 0 || weeklyRemaining === 0;
  
  const bgColor = isCritical 
    ? "bg-[#fef2f2]" 
    : isWarning 
    ? "bg-[#fffbeb]" 
    : "bg-white";
  
  const borderColor = isCritical
    ? "border-[#fca5a5]"
    : isWarning
    ? "border-[#fcd34d]"
    : "border-[#e5e5e5]";
  
  const textColor = isCritical
    ? "text-[#dc2626]"
    : isWarning
    ? "text-[#d97706]"
    : "text-[#737373]";

  return (
    <Card className={`p-4 border ${bgColor} ${borderColor} transition-all`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {isCritical ? (
              <AlertCircle className="w-4 h-4 text-[#dc2626]" />
            ) : (
              <TrendingUp className="w-4 h-4 text-[#737373]" />
            )}
            <h4 className="text-sm text-[#1a1a1a]">Contador de Uso</h4>
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <div className="text-xs text-[#737373] mb-1">Hoje</div>
              <div className={`text-sm ${isCritical && stats.daily >= FREE_LIMITS.dailyLimit ? textColor : 'text-[#1a1a1a]'}`}>
                <span className="font-medium">{stats.daily}</span>
                <span className="text-[#737373]"> / {FREE_LIMITS.dailyLimit}</span>
              </div>
            </div>
            
            <div className="h-8 w-px bg-[#e5e5e5]" />
            
            <div>
              <div className="text-xs text-[#737373] mb-1">Semanal</div>
              <div className={`text-sm ${isCritical && stats.weekly >= FREE_LIMITS.weeklyLimit ? textColor : 'text-[#1a1a1a]'}`}>
                <span className="font-medium">{stats.weekly}</span>
                <span className="text-[#737373]"> / {FREE_LIMITS.weeklyLimit}</span>
              </div>
            </div>
          </div>
        </div>
        
        {(isWarning || isCritical) && (
          <div className={`text-xs px-2 py-1 rounded ${isCritical ? 'bg-[#dc2626] text-white' : 'bg-[#d97706] text-white'}`}>
            {isCritical ? 'Limite atingido' : 'Quase lá'}
          </div>
        )}
      </div>
      
      {isCritical && (
        <div className="mt-3 pt-3 border-t border-[#fca5a5]">
          <p className="text-xs text-[#dc2626]">
            Você atingiu seu limite gratuito. Faça upgrade para continuar gerando desculpas.
          </p>
        </div>
      )}
      
      {isWarning && !isCritical && (
        <div className="mt-3 pt-3 border-t border-[#fcd34d]">
          <p className="text-xs text-[#d97706]">
            {dailyRemaining === 1 
              ? "1 desculpa restante hoje" 
              : `${weeklyRemaining} desculpas restantes esta semana`}
          </p>
        </div>
      )}
    </Card>
  );
}