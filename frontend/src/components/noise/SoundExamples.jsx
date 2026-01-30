import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, Play, Square, Headphones } from 'lucide-react';

const soundExamples = [
  {
    id: 'whisper',
    name: 'Whisper',
    decibels: 30,
    level: 'safe',
    description: 'Quiet library',
    icon: '🤫',
    frequency: 200,
    type: 'sine',
    volume: 0.02,
    noiseAmount: 0.01,
  },
  {
    id: 'conversation',
    name: 'Conversation',
    decibels: 60,
    level: 'moderate',
    description: 'Normal talking',
    icon: '💬',
    frequency: 300,
    type: 'triangle',
    volume: 0.08,
    noiseAmount: 0.03,
  },
  {
    id: 'traffic',
    name: 'City Traffic',
    decibels: 75,
    level: 'loud',
    description: 'Busy street',
    icon: '🚗',
    frequency: 150,
    type: 'sawtooth',
    volume: 0.15,
    noiseAmount: 0.08,
  },
  {
    id: 'concert',
    name: 'Rock Concert',
    decibels: 100,
    level: 'harmful',
    description: 'Dangerous level',
    icon: '🎸',
    frequency: 400,
    type: 'square',
    volume: 0.25,
    noiseAmount: 0.15,
  },
];

const SoundExamples = () => {
  const [playingId, setPlayingId] = useState(null);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainRef = useRef(null);
  const noiseSourceRef = useRef(null);

  const stopSound = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (noiseSourceRef.current) {
      noiseSourceRef.current.stop();
      noiseSourceRef.current.disconnect();
      noiseSourceRef.current = null;
    }
    setPlayingId(null);
  }, []);

  const playSound = useCallback((example) => {
    // Stop any currently playing sound
    stopSound();

    // Create or resume audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioContextRef.current;

    // Create gain node for volume control
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(example.volume, ctx.currentTime + 0.1);
    gainNode.connect(ctx.destination);
    gainRef.current = gainNode;

    // Create oscillator for tone
    const oscillator = ctx.createOscillator();
    oscillator.type = example.type;
    oscillator.frequency.setValueAtTime(example.frequency, ctx.currentTime);
    
    // Add some frequency variation for more realistic sound
    oscillator.frequency.linearRampToValueAtTime(example.frequency * 1.02, ctx.currentTime + 0.5);
    oscillator.frequency.linearRampToValueAtTime(example.frequency * 0.98, ctx.currentTime + 1);
    oscillator.frequency.linearRampToValueAtTime(example.frequency, ctx.currentTime + 1.5);
    
    oscillator.connect(gainNode);
    oscillator.start();
    oscillatorRef.current = oscillator;

    // Create noise for texture
    if (example.noiseAmount > 0) {
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(example.noiseAmount, ctx.currentTime);
      
      // Add low-pass filter to noise
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(example.frequency * 2, ctx.currentTime);
      
      noiseSource.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSource.start();
      noiseSourceRef.current = noiseSource;
    }

    setPlayingId(example.id);

    // Auto-stop after 2 seconds
    setTimeout(() => {
      if (gainRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
      }
      setTimeout(stopSound, 250);
    }, 2000);
  }, [stopSound]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'safe': return 'bg-noise-safe/20 border-noise-safe/40 hover:bg-noise-safe/30';
      case 'moderate': return 'bg-noise-moderate/20 border-noise-moderate/40 hover:bg-noise-moderate/30';
      case 'loud': return 'bg-noise-loud/20 border-noise-loud/40 hover:bg-noise-loud/30';
      case 'harmful': return 'bg-noise-harmful/20 border-noise-harmful/40 hover:bg-noise-harmful/30';
      default: return '';
    }
  };

  const getLevelTextColor = (level) => {
    switch (level) {
      case 'safe': return 'text-noise-safe';
      case 'moderate': return 'text-noise-moderate';
      case 'loud': return 'text-noise-loud';
      case 'harmful': return 'text-noise-harmful';
      default: return '';
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Headphones className="w-4 h-4 text-primary" />
          Sound Examples
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          🎧 Use headphones at low volume for best experience
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {soundExamples.map((example) => (
            <button
              key={example.id}
              onClick={() => playingId === example.id ? stopSound() : playSound(example)}
              className={`p-3 rounded-xl border transition-all duration-200 text-left ${getLevelColor(example.level)} ${
                playingId === example.id ? 'ring-2 ring-primary scale-[0.98]' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xl">{example.icon}</span>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${getLevelTextColor(example.level)} bg-background/50`}>
                  {playingId === example.id ? (
                    <>
                      <Square className="w-3 h-3 fill-current" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span>{example.decibels}dB</span>
                    </>
                  )}
                </div>
              </div>
              <p className="font-semibold text-sm text-foreground">{example.name}</p>
              <p className="text-xs text-muted-foreground">{example.description}</p>
              
              {/* Playing indicator */}
              {playingId === example.id && (
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full ${getLevelTextColor(example.level).replace('text-', 'bg-')}`}
                      style={{
                        height: `${8 + Math.random() * 12}px`,
                        animation: `pulse 0.3s ease-in-out ${i * 0.1}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <Volume2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              <strong className="text-foreground">Note:</strong> These are simulated sounds to demonstrate relative volume levels. 
              Actual sounds at these decibels would vary in character.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoundExamples;
