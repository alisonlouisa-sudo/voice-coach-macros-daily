import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Utensils, Zap, Target, TrendingUp } from 'lucide-react';

interface NutritionData {
  calories: { current: number; target: number };
  protein: { current: number; target: number };
  carbs: { current: number; target: number };
  fat: { current: number; target: number };
  exercise: { calories: number };
}

interface DailyDashboardProps {
  data: NutritionData;
}

export function DailyDashboard({ data }: DailyDashboardProps) {
  const netCalories = data.calories.current - data.exercise.calories;
  const proteinPercent = (data.protein.current / data.protein.target) * 100;
  const caloriePercent = (data.calories.current / data.calories.target) * 100;

  const getProteinStatus = () => {
    if (proteinPercent >= 100) return { text: "Protein Goal Met!", color: "success" };
    if (proteinPercent >= 80) return { text: "Almost There!", color: "warning" };
    return { text: "Need More Protein", color: "destructive" };
  };

  const proteinStatus = getProteinStatus();

  return (
    <div className="space-y-4">
      {/* Hero Protein Card */}
      <Card className="p-6 bg-gradient-primary border-0 shadow-medium">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Protein Focus</h2>
          </div>
          <Badge 
            variant={proteinStatus.color === "success" ? "default" : "secondary"}
            className={proteinStatus.color === "success" 
              ? "bg-success text-success-foreground" 
              : "bg-warning text-warning-foreground"
            }
          >
            {proteinStatus.text}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-white/80">Daily Progress</span>
            <span className="text-2xl font-bold text-white">
              {data.protein.current}g / {data.protein.target}g
            </span>
          </div>
          <Progress 
            value={proteinPercent} 
            className="h-3 bg-white/20"
            style={{
              '--progress-background': proteinPercent >= 100 
                ? 'hsl(var(--success))' 
                : 'hsl(var(--accent))'
            } as React.CSSProperties}
          />
          <p className="text-white/70 text-sm">
            {proteinPercent >= 100 
              ? "Excellent! You've hit your protein target for perimenopause support."
              : `${Math.round(data.protein.target - data.protein.current)}g more protein needed for optimal muscle support.`
            }
          </p>
        </div>
      </Card>

      {/* Calories Overview */}
      <Card className="p-4 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Energy Balance</h3>
          </div>
          <span className="text-lg font-bold text-foreground">
            {netCalories} net
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Consumed</p>
            <p className="font-semibold text-foreground">{data.calories.current}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Burned</p>
            <p className="font-semibold text-accent">{data.exercise.calories}</p>
          </div>
        </div>
        
        <Progress 
          value={caloriePercent} 
          className="mt-3 h-2" 
        />
      </Card>

      {/* Macros Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 shadow-soft">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Carbs</p>
            <p className="text-xl font-bold text-foreground">{data.carbs.current}g</p>
            <p className="text-xs text-muted-foreground">of {data.carbs.target}g</p>
            <Progress 
              value={(data.carbs.current / data.carbs.target) * 100} 
              className="h-1.5" 
            />
          </div>
        </Card>
        
        <Card className="p-4 shadow-soft">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Fat</p>
            <p className="text-xl font-bold text-foreground">{data.fat.current}g</p>
            <p className="text-xs text-muted-foreground">of {data.fat.target}g</p>
            <Progress 
              value={(data.fat.current / data.fat.target) * 100} 
              className="h-1.5" 
            />
          </div>
        </Card>
      </div>

      {/* Today's Coaching Tip */}
      <Card className="p-4 bg-accent/5 border-accent/20 shadow-soft">
        <div className="flex items-start space-x-3">
          <TrendingUp className="w-5 h-5 text-accent mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">Coach's Tip</h4>
            <p className="text-sm text-muted-foreground">
              {proteinPercent < 80 
                ? "Try adding Greek yogurt or a protein smoothie for an easy protein boost!"
                : "Great protein intake! Focus on timing it around your workouts tomorrow."
              }
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}