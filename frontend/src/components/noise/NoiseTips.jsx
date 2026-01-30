const tips = [
  {
    title: 'Take breaks from noisy environments',
    description: 'Give your ears 15 minutes of quiet for every hour in loud areas.',
  },
  {
    title: 'Keep a safe distance',
    description: 'Moving away from noise sources reduces exposure exponentially.',
  },
  {
    title: 'Use hearing protection',
    description: 'Earplugs can reduce noise by 15-30 dB in harmful environments.',
  },
  {
    title: 'Be aware of peak times',
    description: 'Rush hours and events typically have higher noise levels.',
  },
  {
    title: 'Choose quieter routes',
    description: 'Side streets and parks often have significantly lower noise.',
  },
];

const NoiseTips = ({ isListening }) => {
  if (!isListening) return null;

  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        💡 Noise Awareness Tips
      </h3>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex gap-3 text-sm animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <span className="text-primary font-mono text-xs mt-0.5">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p className="font-medium text-foreground">{tip.title}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{tip.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoiseTips;
