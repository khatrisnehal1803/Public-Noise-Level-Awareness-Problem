const NoiseVisualizer = ({ decibels, level, isListening, history }) => {
  // Calculate intensity for animations (0-1 scale)
  const intensity = Math.min(decibels / 100, 1);
  
  // Get animation class based on noise level
  const getPulseClass = () => {
    if (!isListening) return '';
    switch (level) {
      case 'safe': return 'animate-pulse-safe';
      case 'moderate': return 'animate-pulse-moderate';
      case 'loud': return 'animate-pulse-loud';
      case 'harmful': return 'animate-pulse-harmful';
      default: return '';
    }
  };

  // Get gradient class based on noise level
  const getGradientClass = () => {
    switch (level) {
      case 'safe': return 'noise-safe';
      case 'moderate': return 'noise-moderate';
      case 'loud': return 'noise-loud';
      case 'harmful': return 'noise-harmful';
      default: return 'noise-safe';
    }
  };

  // Generate wave bars for visualization
  const generateWaveBars = () => {
    const barCount = 32;
    const bars = [];
    
    for (let i = 0; i < barCount; i++) {
      const historyIndex = Math.floor((i / barCount) * history.length);
      const value = history[historyIndex] || 0;
      const normalizedHeight = Math.max(10, (value / 120) * 100);
      const angle = (i / barCount) * 360;
      
      bars.push(
        <div
          key={i}
          className="absolute w-1 rounded-full origin-bottom transition-all duration-100"
          style={{
            height: `${normalizedHeight}%`,
            transform: `rotate(${angle}deg) translateY(-120px)`,
            background: `linear-gradient(to top, hsl(var(--noise-${level})), transparent)`,
            opacity: isListening ? 0.6 + (normalizedHeight / 250) : 0.2,
          }}
        />
      );
    }
    
    return bars;
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div 
        className={`absolute w-80 h-80 rounded-full opacity-20 transition-all duration-500 ${isListening ? getGradientClass() : 'bg-muted'}`}
        style={{
          transform: `scale(${1 + intensity * 0.2})`,
        }}
      />
      
      {/* Ripple effects */}
      {isListening && (
        <>
          <div 
            className="absolute w-64 h-64 rounded-full border-2 opacity-30 animate-ripple"
            style={{
              borderColor: `hsl(var(--noise-${level}))`,
              animationDelay: '0s',
            }}
          />
          <div 
            className="absolute w-64 h-64 rounded-full border-2 opacity-20 animate-ripple"
            style={{
              borderColor: `hsl(var(--noise-${level}))`,
              animationDelay: '0.5s',
            }}
          />
          <div 
            className="absolute w-64 h-64 rounded-full border-2 opacity-10 animate-ripple"
            style={{
              borderColor: `hsl(var(--noise-${level}))`,
              animationDelay: '1s',
            }}
          />
        </>
      )}

      {/* Wave bars container */}
      <div className="absolute w-64 h-64 flex items-center justify-center">
        {isListening && generateWaveBars()}
      </div>

      {/* Main circle */}
      <div 
        className={`relative w-52 h-52 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${getPulseClass()} ${isListening ? getGradientClass() : 'bg-secondary'}`}
      >
        {/* Inner content */}
        <div className="text-center">
          <div className="font-mono text-5xl font-bold text-white drop-shadow-lg">
            {isListening ? Math.round(decibels) : '--'}
          </div>
          <div className="text-sm font-medium text-white/80 mt-1">
            dB
          </div>
        </div>
      </div>

      {/* Level indicator badge */}
      {isListening && (
        <div 
          className={`absolute -bottom-4 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${getGradientClass()}`}
        >
          <span className="text-white drop-shadow">
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        </div>
      )}
    </div>
  );
};

export default NoiseVisualizer;
