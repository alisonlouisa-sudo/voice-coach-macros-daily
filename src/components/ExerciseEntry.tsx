import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, Flame, Plus, Dumbbell, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseEntry {
  id: string;
  type: string;
  duration: number; // minutes
  calories: number;
  description: string;
  timestamp: string;
}

interface ExerciseEntryProps {
  exercises: ExerciseEntry[];
  onAddExercise: (exercise: Omit<ExerciseEntry, 'id' | 'timestamp'>) => void;
}

export function ExerciseEntry({ exercises, onAddExercise }: ExerciseEntryProps) {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

  const processExerciseVoice = (transcript: string) => {
    // Smart exercise parsing - in reality this would use AI
    const exerciseDatabase: Record<string, { caloriesPerMinute: number; type: string }> = {
      'strength training': { caloriesPerMinute: 6, type: 'Strength' },
      'weight lifting': { caloriesPerMinute: 6, type: 'Strength' },
      'running': { caloriesPerMinute: 12, type: 'Cardio' },
      'jogging': { caloriesPerMinute: 10, type: 'Cardio' },
      'walking': { caloriesPerMinute: 4, type: 'Cardio' },
      'cycling': { caloriesPerMinute: 8, type: 'Cardio' },
      'yoga': { caloriesPerMinute: 3, type: 'Flexibility' },
      'pilates': { caloriesPerMinute: 4, type: 'Strength' },
      'swimming': { caloriesPerMinute: 11, type: 'Cardio' },
      'dancing': { caloriesPerMinute: 5, type: 'Cardio' },
      'hiit': { caloriesPerMinute: 12, type: 'Cardio' },
    };

    // Extract duration from transcript
    const durationMatch = transcript.match(/(\d+)\s*(?:minute|min)/i);
    const duration = durationMatch ? parseInt(durationMatch[1]) : 30; // default 30 minutes

    // Find exercise type
    const words = transcript.toLowerCase();
    let exerciseData = { caloriesPerMinute: 6, type: 'Exercise' };
    let exerciseType = 'General Exercise';

    Object.entries(exerciseDatabase).forEach(([exercise, data]) => {
      if (words.includes(exercise.replace(' ', '')) || words.includes(exercise)) {
        exerciseData = data;
        exerciseType = exercise.charAt(0).toUpperCase() + exercise.slice(1);
      }
    });

    return {
      type: exerciseType,
      duration,
      calories: Math.round(exerciseData.caloriesPerMinute * duration),
      description: transcript,
    };
  };

  const handleVoiceExercise = (transcript: string) => {
    const exerciseData = processExerciseVoice(transcript);
    onAddExercise(exerciseData);
  };

  const getTotalCaloriesBurned = () => {
    return exercises.reduce((total, exercise) => total + exercise.calories, 0);
  };

  const getTotalDuration = () => {
    return exercises.reduce((total, exercise) => total + exercise.duration, 0);
  };

  const getExerciseIcon = (type: string) => {
    if (type.toLowerCase().includes('strength') || type.toLowerCase().includes('weight')) {
      return <Dumbbell className="w-4 h-4" />;
    }
    if (type.toLowerCase().includes('cardio') || type.toLowerCase().includes('running')) {
      return <Zap className="w-4 h-4" />;
    }
    return <Activity className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Exercise Summary */}
      {exercises.length > 0 && (
        <Card className="p-4 bg-accent/5 border-accent/20 shadow-soft">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Calories Burned</p>
                <p className="text-xl font-bold text-accent">{getTotalCaloriesBurned()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-xl font-bold text-primary">{getTotalDuration()}m</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Add Exercise */}
      <Card className="p-4 border-dashed border-2 border-muted-foreground/20 shadow-soft">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Log Exercise</h3>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              // This would trigger the voice recorder
              const sampleTranscript = "30 minutes of strength training";
              handleVoiceExercise(sampleTranscript);
            }}
          >
            <Activity className="w-4 h-4 mr-2" />
            Tap to Add Exercise
          </Button>
        </div>
      </Card>

      {/* Exercise Entries */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground text-lg">Today's Workouts</h3>
        
        <div className="space-y-2">
          {exercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className={cn(
                "p-4 shadow-soft cursor-pointer transition-all",
                selectedExerciseId === exercise.id && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedExerciseId(selectedExerciseId === exercise.id ? null : exercise.id)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2">
                    {getExerciseIcon(exercise.type)}
                    <div>
                      <p className="font-medium text-foreground leading-tight">{exercise.description}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {exercise.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(exercise.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">{exercise.duration} min</p>
                      <p className="text-muted-foreground">Duration</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-accent" />
                    <div>
                      <p className="font-semibold text-accent">{exercise.calories} cal</p>
                      <p className="text-muted-foreground">Burned</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {exercises.length === 0 && (
        <Card className="p-8 text-center space-y-4 shadow-soft">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Activity className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">No workouts logged today</h3>
            <p className="text-sm text-muted-foreground">
              Tell me about your exercise to track calories burned
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}