const NoiseScale = () => {
  const levels = [
    { range: '0-50 dB', label: 'Safe', color: 'bg-noise-safe', examples: 'Whisper, Library' },
    { range: '50-70 dB', label: 'Moderate', color: 'bg-noise-moderate', examples: 'Conversation, Office' },
    { range: '70-85 dB', label: 'Loud', color: 'bg-noise-loud', examples: 'Traffic, Restaurant' },
    { range: '85+ dB', label: 'Harmful', color: 'bg-noise-harmful', examples: 'Concert, Machinery' },
  ];

  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        📊 Noise Level Scale
      </h3>
      <div className="space-y-2">
        {levels.map((level, index) => (
          <div key={index} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <div className={`w-3 h-3 rounded-full ${level.color}`} />
            <div className="flex-1 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-muted-foreground">{level.range}</span>
                <span className="text-xs text-foreground ml-2 font-medium">{level.label}</span>
              </div>
              <span className="text-[10px] text-muted-foreground hidden sm:inline">{level.examples}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoiseScale;
