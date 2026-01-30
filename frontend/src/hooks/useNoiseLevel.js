import { useState, useEffect, useCallback, useRef } from 'react';

export const SCENARIOS = [
  { id: 'park', name: 'Quiet Park', icon: '🌳', base: 38, variation: 10, description: 'Peaceful nature sounds' },
  { id: 'street', name: 'City Street', icon: '🏙️', base: 58, variation: 15, description: 'Moderate urban noise' },
  { id: 'construction', name: 'Construction', icon: '🏗️', base: 82, variation: 12, description: 'Heavy machinery' },
  { id: 'concert', name: 'Rock Concert', icon: '🎸', base: 95, variation: 10, description: 'Dangerously loud' },
];

// Noise level thresholds based on WHO guidelines
const THRESHOLDS = {
  safe: 50,
  moderate: 70,
  loud: 85,
  harmful: 100,
};

export const getNoiseLevel = (db) => {
  if (db < THRESHOLDS.safe) return 'safe';
  if (db < THRESHOLDS.moderate) return 'moderate';
  if (db < THRESHOLDS.loud) return 'loud';
  return 'harmful';
};

export const getNoiseLevelInfo = (level) => {
  const info = {
    safe: {
      label: 'Safe',
      description: 'Comfortable noise level',
      health: 'No hearing risk. Enjoy your surroundings!',
      examples: 'Library, quiet office, light rain',
      maxExposure: 'Unlimited',
      icon: '🌿',
    },
    moderate: {
      label: 'Moderate',
      description: 'Noticeable ambient noise',
      health: 'Generally safe, but may cause mild stress over time.',
      examples: 'Normal conversation, busy restaurant, traffic',
      maxExposure: '8+ hours',
      icon: '⚡',
    },
    loud: {
      label: 'Loud',
      description: 'Elevated noise level',
      health: 'May cause hearing fatigue. Consider ear protection for extended exposure.',
      examples: 'Busy street, construction nearby, loud music',
      maxExposure: '2-4 hours',
      icon: '⚠️',
    },
    harmful: {
      label: 'Harmful',
      description: 'Dangerous noise level',
      health: 'Risk of hearing damage! Limit exposure and use protection.',
      examples: 'Concert, jackhammer, siren at close range',
      maxExposure: '15-30 minutes max',
      icon: '🔴',
    },
  };
  return info[level];
};

export const useNoiseLevel = () => {
  const [decibels, setDecibels] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [history, setHistory] = useState([]);
  const [scenario, setScenarioState] = useState('street');
  
  const demoIntervalRef = useRef(null);
  const scenarioRef = useRef(scenario);

  // Keep ref in sync with state
  useEffect(() => {
    scenarioRef.current = scenario;
  }, [scenario]);

  const updateHistory = useCallback((db) => {
    setHistory(prev => {
      const newHistory = [...prev, db];
      return newHistory.slice(-50);
    });
  }, []);

  const setScenario = useCallback((newScenario) => {
    setScenarioState(newScenario);
  }, []);

  const startListening = useCallback(() => {
    setIsListening(true);
    setHistory([]);
    
    let currentLevel = SCENARIOS.find(s => s.id === scenarioRef.current)?.base || 55;
    
    demoIntervalRef.current = window.setInterval(() => {
      const config = SCENARIOS.find(s => s.id === scenarioRef.current);
      if (!config) return;
      
      // Smoothly transition to target base level
      const targetLevel = config.base;
      currentLevel += (targetLevel - currentLevel) * 0.1;
      
      // Add realistic fluctuation
      const variation = (Math.random() - 0.5) * config.variation;
      let finalLevel = currentLevel + variation;
      
      // Occasional spikes based on scenario
      if (Math.random() < 0.03) {
        finalLevel += 8 + Math.random() * 8;
      }
      
      const smoothedDb = Math.round(Math.max(25, Math.min(115, finalLevel)) * 10) / 10;
      setDecibels(smoothedDb);
      updateHistory(smoothedDb);
    }, 100);
  }, [updateHistory]);

  const stopListening = useCallback(() => {
    if (demoIntervalRef.current) {
      clearInterval(demoIntervalRef.current);
      demoIntervalRef.current = null;
    }
    setIsListening(false);
  }, []);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    decibels,
    level: getNoiseLevel(decibels),
    isListening,
    scenario,
    setScenario,
    startListening,
    stopListening,
    history,
  };
};
