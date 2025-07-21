import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Check, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoodEntry {
  id: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: string;
}

interface NutritionEntryProps {
  entries: FoodEntry[];
  onAddEntry: (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => void;
  onEditEntry: (id: string, entry: Partial<FoodEntry>) => void;
}

export function NutritionEntry({ entries, onAddEntry, onEditEntry }: NutritionEntryProps) {
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  // Simulate processing voice input to nutrition data
  const processVoiceInput = (transcript: string) => {
    // This would normally call an AI service to parse the food description
    // For demo, we'll use some smart defaults based on common foods
    
    const foodDatabase: Record<string, { calories: number; protein: number; carbs: number; fat: number }> = {
      'scrambled eggs': { calories: 200, protein: 14, carbs: 2, fat: 14 },
      'whole grain toast': { calories: 80, protein: 4, carbs: 15, fat: 1 },
      'spinach': { calories: 7, protein: 1, carbs: 1, fat: 0 },
      'greek yogurt': { calories: 130, protein: 15, carbs: 9, fat: 4 },
      'banana': { calories: 105, protein: 1, carbs: 27, fat: 0 },
      'almonds': { calories: 160, protein: 6, carbs: 6, fat: 14 },
      'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 4 },
      'quinoa': { calories: 150, protein: 6, carbs: 27, fat: 2 },
      'broccoli': { calories: 25, protein: 3, carbs: 5, fat: 0 },
    };

    // Simple matching - in reality this would be much more sophisticated
    const words = transcript.toLowerCase();
    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;

    Object.entries(foodDatabase).forEach(([food, nutrition]) => {
      if (words.includes(food.replace(' ', '')) || words.includes(food)) {
        totalCalories += nutrition.calories;
        totalProtein += nutrition.protein;
        totalCarbs += nutrition.carbs;
        totalFat += nutrition.fat;
      }
    });

    // Default if no matches found
    if (totalCalories === 0) {
      totalCalories = 250;
      totalProtein = 15;
      totalCarbs = 20;
      totalFat = 10;
    }

    return {
      description: transcript,
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
    };
  };

  const handleVoiceEntry = (transcript: string) => {
    const nutritionData = processVoiceInput(transcript);
    onAddEntry(nutritionData);
  };

  const getMealTime = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Breakfast';
    if (hour < 16) return 'Lunch';
    if (hour < 20) return 'Dinner';
    return 'Snack';
  };

  const groupedEntries = entries.reduce((groups, entry) => {
    const hour = new Date(entry.timestamp).getHours();
    const mealTime = hour < 11 ? 'Breakfast' : hour < 16 ? 'Lunch' : hour < 20 ? 'Dinner' : 'Snacks';
    if (!groups[mealTime]) groups[mealTime] = [];
    groups[mealTime].push(entry);
    return groups;
  }, {} as Record<string, FoodEntry[]>);

  return (
    <div className="space-y-6">
      {/* Quick Add Voice Entry */}
      <Card className="p-4 border-dashed border-2 border-muted-foreground/20 shadow-soft">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Add {getMealTime()}</h3>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              // This would trigger the voice recorder
              const sampleTranscript = "Greek yogurt with berries and granola";
              handleVoiceEntry(sampleTranscript);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Tap to Add Food
          </Button>
        </div>
      </Card>

      {/* Meal Entries */}
      {Object.entries(groupedEntries).map(([mealTime, mealEntries]) => (
        <div key={mealTime} className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground text-lg">{mealTime}</h3>
            <Badge variant="secondary" className="text-xs">
              {mealEntries.reduce((sum, entry) => sum + entry.calories, 0)} cal
            </Badge>
          </div>
          
          <div className="space-y-2">
            {mealEntries.map((entry) => (
              <Card 
                key={entry.id} 
                className={cn(
                  "p-4 shadow-soft cursor-pointer transition-all",
                  selectedEntryId === entry.id && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedEntryId(selectedEntryId === entry.id ? null : entry.id)}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-foreground leading-tight">{entry.description}</p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <p className="font-semibold text-foreground">{entry.calories}</p>
                      <p className="text-muted-foreground">cal</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-primary">{entry.protein}g</p>
                      <p className="text-muted-foreground">protein</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground">{entry.carbs}g</p>
                      <p className="text-muted-foreground">carbs</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground">{entry.fat}g</p>
                      <p className="text-muted-foreground">fat</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Empty state */}
      {entries.length === 0 && (
        <Card className="p-8 text-center space-y-4 shadow-soft">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">No meals logged today</h3>
            <p className="text-sm text-muted-foreground">
              Use your voice to quickly log what you've eaten
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}