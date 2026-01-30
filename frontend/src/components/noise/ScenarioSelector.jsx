import { SCENARIOS } from '@/frontend/hooks/useNoiseLevel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const ScenarioSelector = ({ selected, onSelect, isListening }) => {
  const getLevelColor = (base) => {
    if (base < 50) return 'border-noise-safe/50 bg-noise-safe/10 hover:bg-noise-safe/20';
    if (base < 70) return 'border-noise-moderate/50 bg-noise-moderate/10 hover:bg-noise-moderate/20';
    if (base < 85) return 'border-noise-loud/50 bg-noise-loud/10 hover:bg-noise-loud/20';
    return 'border-noise-harmful/50 bg-noise-harmful/10 hover:bg-noise-harmful/20';
  };

  const getSelectedColor = (base) => {
    if (base < 50) return 'ring-noise-safe border-noise-safe bg-noise-safe/20';
    if (base < 70) return 'ring-noise-moderate border-noise-moderate bg-noise-moderate/20';
    if (base < 85) return 'ring-noise-loud border-noise-loud bg-noise-loud/20';
    return 'ring-noise-harmful border-noise-harmful bg-noise-harmful/20';
  };

  const getDbColor = (base) => {
    if (base < 50) return 'text-noise-safe';
    if (base < 70) return 'text-noise-moderate';
    if (base < 85) return 'text-noise-loud';
    return 'text-noise-harmful';
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Choose Environment
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Select a scenario to simulate its noise pattern
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SCENARIOS.map((scenario) => {
            const isSelected = selected === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => onSelect(scenario.id)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  isSelected 
                    ? `ring-2 ${getSelectedColor(scenario.base)}` 
                    : getLevelColor(scenario.base)
                }`}
              >
                {/* Live indicator */}
                {isSelected && isListening && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
                
                <span className="text-2xl block mb-2">{scenario.icon}</span>
                <p className="font-semibold text-sm text-foreground">{scenario.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{scenario.description}</p>
                <div className={`mt-2 text-xs font-bold ${getDbColor(scenario.base)}`}>
                  ~{scenario.base} dB
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioSelector;
