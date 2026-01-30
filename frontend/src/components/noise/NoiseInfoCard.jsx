import { getNoiseLevelInfo } from '@/frontend/hooks/useNoiseLevel';
import { Clock, Heart, Volume2 } from 'lucide-react';

const NoiseInfoCard = ({ level, isListening }) => {
  const info = getNoiseLevelInfo(level);
  
  const getBorderColor = () => {
    switch (level) {
      case 'safe': return 'border-noise-safe/30';
      case 'moderate': return 'border-noise-moderate/30';
      case 'loud': return 'border-noise-loud/30';
      case 'harmful': return 'border-noise-harmful/30';
      default: return 'border-border';
    }
  };

  const getAccentColor = () => {
    switch (level) {
      case 'safe': return 'text-noise-safe';
      case 'moderate': return 'text-noise-moderate';
      case 'loud': return 'text-noise-loud';
      case 'harmful': return 'text-noise-harmful';
      default: return 'text-muted-foreground';
    }
  };

  if (!isListening) {
    return (
      <div className="glass rounded-2xl p-6 animate-fade-in">
        <div className="text-center text-muted-foreground">
          <Volume2 className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Start listening to see noise level information</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass rounded-2xl p-6 border-2 ${getBorderColor()} animate-fade-in transition-all duration-500`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{info.icon}</span>
        <div>
          <h3 className={`text-xl font-semibold ${getAccentColor()}`}>
            {info.label} Zone
          </h3>
          <p className="text-sm text-muted-foreground">{info.description}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="space-y-4">
        {/* Health Impact */}
        <div className="flex gap-3">
          <Heart className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getAccentColor()}`} />
          <div>
            <p className="text-sm font-medium text-foreground">Health Impact</p>
            <p className="text-sm text-muted-foreground">{info.health}</p>
          </div>
        </div>

        {/* Safe Exposure */}
        <div className="flex gap-3">
          <Clock className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getAccentColor()}`} />
          <div>
            <p className="text-sm font-medium text-foreground">Safe Exposure Time</p>
            <p className="text-sm text-muted-foreground">{info.maxExposure}</p>
          </div>
        </div>

        {/* Examples */}
        <div className="pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Similar to:</span> {info.examples}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoiseInfoCard;
