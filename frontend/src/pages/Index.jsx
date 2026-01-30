import { useState } from 'react';
import { useNoiseLevel } from '@/frontend/hooks/useNoiseLevel';
import {
  NoiseVisualizer,
  NoiseInfoCard,
  NoiseComparison,
  NoiseTips,
  NoiseScale,
  NoiseHistoryChart,
  SoundExamples,
  ScenarioSelector,
  LocationSelector,
  getLocationById,
} from '@/frontend/components/noise';
import { Button } from '@/components/ui/button';
import { Play, Square, Volume2 } from 'lucide-react';

const Index = () => {
  const { decibels, level, isListening, scenario, setScenario, startListening, stopListening, history } = useNoiseLevel();
  const [selectedLocation, setSelectedLocation] = useState('street');
  
  const currentLocation = getLocationById(selectedLocation);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">SoundScape</h1>
                <p className="text-xs text-muted-foreground">Public Noise Awareness</p>
              </div>
            </div>
            
            {/* Status indicator */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isListening 
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isListening 
                  ? 'bg-primary animate-pulse' 
                  : 'bg-muted-foreground'
              }`} />
              {isListening ? 'Simulating' : 'Ready'}
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Is This Place Too Noisy?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Explore realistic noise level simulations. Understand when sound becomes harmful and learn to protect your hearing.
          </p>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Visualizer */}
          <div className="flex flex-col items-center justify-center">
            {/* Noise Visualizer */}
            <div className="mb-8">
              <NoiseVisualizer 
                decibels={decibels} 
                level={level} 
                isListening={isListening}
                history={history}
              />
            </div>

            {/* Simulation Info */}
            {isListening && (
              <div className="mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium flex items-center gap-2 animate-fade-in">
                <Volume2 className="w-4 h-4" />
                Simulating real-world noise patterns
              </div>
            )}

            {/* Control Button */}
            {!isListening ? (
              <Button
                onClick={startListening}
                size="lg"
                className="px-8 py-6 text-base font-semibold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Simulation
              </Button>
            ) : (
              <Button
                onClick={stopListening}
                size="lg"
                className="px-8 py-6 text-base font-semibold rounded-2xl bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-all duration-300"
              >
                <Square className="w-5 h-5 mr-2" />
                Stop Simulation
              </Button>
            )}

            {/* Hint when not running */}
            {!isListening && (
              <p className="mt-4 text-xs text-muted-foreground text-center max-w-sm animate-fade-in">
                💡 Watch how noise levels change across different environments like parks, streets, and construction sites
              </p>
            )}
          </div>

          {/* Right Column - Info */}
          <div className="space-y-6">
            <NoiseHistoryChart 
              history={history} 
              currentLevel={level} 
              isListening={isListening} 
            />
            <NoiseInfoCard level={level} isListening={isListening} />
            <NoiseComparison 
              currentDb={decibels} 
              location={currentLocation} 
              isListening={isListening} 
            />
            <NoiseScale />
          </div>
        </div>

        {/* Scenario Selector */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <ScenarioSelector 
            selected={scenario} 
            onSelect={setScenario} 
            isListening={isListening} 
          />
        </section>

        {/* Sound Examples */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '150ms' }}>
          <SoundExamples />
        </section>

        {/* Location Selector */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <LocationSelector selected={selectedLocation} onSelect={setSelectedLocation} />
        </section>

        {/* Tips Section */}
        <section className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <NoiseTips isListening={isListening} />
        </section>

        {/* Footer Info */}
        <footer className="mt-16 pt-8 border-t border-border/50 text-center">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              <strong className="text-foreground">About Noise Awareness:</strong> This tool simulates realistic noise patterns to help you understand sound levels in different environments. 
              Learn about safe exposure limits and protect your hearing health.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <span>🎧 Educational simulation</span>
              <span>📱 Works on mobile & desktop</span>
              <span>🌍 Helping create quieter public spaces</span>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-6">
              SoundScape — Public Noise Level Awareness Tool
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
