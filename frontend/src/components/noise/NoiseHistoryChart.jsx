import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getNoiseLevel } from '@/frontend/hooks/useNoiseLevel';

const NoiseHistoryChart = ({ history, currentLevel, isListening }) => {
  const chartData = useMemo(() => {
    return history.map((db, index) => ({
      time: index,
      decibels: db,
      level: getNoiseLevel(db),
    }));
  }, [history]);

  const stats = useMemo(() => {
    if (history.length === 0) return { avg: 0, max: 0, min: 0, trend: 'stable' };
    
    const avg = Math.round(history.reduce((a, b) => a + b, 0) / history.length);
    const max = Math.round(Math.max(...history));
    const min = Math.round(Math.min(...history));
    
    // Calculate trend from last 10 readings
    const recent = history.slice(-10);
    const older = history.slice(-20, -10);
    
    let trend = 'stable';
    if (recent.length >= 5 && older.length >= 5) {
      const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
      const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
      if (recentAvg > olderAvg + 3) trend = 'up';
      else if (recentAvg < olderAvg - 3) trend = 'down';
    }
    
    return { avg, max, min, trend };
  }, [history]);

  const getGradientColors = () => {
    switch (currentLevel) {
      case 'safe': return { start: '#22c55e', end: '#16a34a' };
      case 'moderate': return { start: '#eab308', end: '#ca8a04' };
      case 'loud': return { start: '#f97316', end: '#ea580c' };
      case 'harmful': return { start: '#ef4444', end: '#dc2626' };
      default: return { start: '#22c55e', end: '#16a34a' };
    }
  };

  const colors = getGradientColors();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const db = Math.round(payload[0].value);
      const level = getNoiseLevel(db);
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-xl">
          <p className="text-lg font-bold text-foreground">{db} dB</p>
          <p className="text-xs text-muted-foreground capitalize">{level}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Noise History
          </CardTitle>
          {isListening && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {stats.trend === 'up' && <TrendingUp className="w-3 h-3 text-destructive" />}
              {stats.trend === 'down' && <TrendingDown className="w-3 h-3 text-noise-safe" />}
              {stats.trend === 'stable' && <Minus className="w-3 h-3" />}
              <span className="capitalize">{stats.trend}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        {/* Stats Row */}
        {isListening && history.length > 5 && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 rounded-lg bg-muted/50">
              <p className="text-lg font-bold text-foreground">{stats.avg}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Avg dB</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-noise-safe/10">
              <p className="text-lg font-bold text-noise-safe">{stats.min}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Min</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-noise-harmful/10">
              <p className="text-lg font-bold text-noise-harmful">{stats.max}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Max</p>
            </div>
          </div>
        )}

        {/* Chart */}
        <div className="h-40 w-full">
          {!isListening || history.length < 2 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {isListening ? 'Collecting data...' : 'Start simulation to see history'}
                </p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="noiseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.start} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={colors.end} stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={colors.start} />
                    <stop offset="100%" stopColor={colors.end} />
                  </linearGradient>
                </defs>
                
                {/* Danger zone reference lines */}
                <ReferenceLine y={85} stroke="hsl(var(--noise-harmful))" strokeDasharray="3 3" strokeOpacity={0.5} />
                <ReferenceLine y={70} stroke="hsl(var(--noise-loud))" strokeDasharray="3 3" strokeOpacity={0.3} />
                <ReferenceLine y={50} stroke="hsl(var(--noise-moderate))" strokeDasharray="3 3" strokeOpacity={0.3} />
                
                <XAxis dataKey="time" hide />
                <YAxis 
                  domain={[20, 110]} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  width={35}
                />
                // eslint-disable-next-line react-hooks/static-components
                <Tooltip content />
                <Area
                  type="monotone"
                  dataKey="decibels"
                  stroke="url(#lineGradient)"
                  strokeWidth={2}
                  fill="url(#noiseGradient)"
                  animationDuration={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Legend */}
        {isListening && history.length > 5 && (
          <div className="flex justify-center gap-4 mt-3 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-noise-safe" />
              <span>&lt;50 Safe</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-noise-moderate" />
              <span>50-70</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-noise-loud" />
              <span>70-85</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-noise-harmful" />
              <span>&gt;85 Danger</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NoiseHistoryChart;
