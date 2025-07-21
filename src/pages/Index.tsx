import React, { useState } from 'react';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { DailyDashboard } from '@/components/DailyDashboard';
import { NutritionEntry } from '@/components/NutritionEntry';
import { ExerciseEntry } from '@/components/ExerciseEntry';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Settings, User } from 'lucide-react';
import heroImage from '@/assets/hero-nutrition.jpg';

// Sample data for demo
const sampleNutritionData = {
  calories: { current: 1450, target: 1800 },
  protein: { current: 85, target: 110 }, // For 168lb, 45-year-old woman in perimenopause
  carbs: { current: 145, target: 180 },
  fat: { current: 68, target: 75 },
  exercise: { calories: 280 },
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [foodEntries, setFoodEntries] = useState([
    {
      id: '1',
      description: 'Scrambled eggs with spinach and whole grain toast',
      calories: 287,
      protein: 19,
      carbs: 17,
      fat: 15,
      timestamp: new Date().toISOString(),
    },
    {
      id: '2', 
      description: 'Greek yogurt with berries and almonds',
      calories: 245,
      protein: 18,
      carbs: 22,
      fat: 12,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    }
  ]);

  const [exerciseEntries, setExerciseEntries] = useState([
    {
      id: '1',
      type: 'Strength Training',
      duration: 45,
      calories: 280,
      description: '45 minutes of strength training',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    }
  ]);

  const handleAddFood = (entry: any) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setFoodEntries(prev => [...prev, newEntry]);
  };

  const handleAddExercise = (entry: any) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setExerciseEntries(prev => [...prev, newEntry]);
  };

  const handleEditFood = (id: string, updates: any) => {
    setFoodEntries(prev => 
      prev.map(entry => entry.id === id ? { ...entry, ...updates } : entry)
    );
  };

  const handleVoiceTranscription = (transcript: string) => {
    // Smart routing based on content
    if (transcript.toLowerCase().includes('exercise') || 
        transcript.toLowerCase().includes('workout') ||
        transcript.toLowerCase().includes('training') ||
        transcript.toLowerCase().includes('running') ||
        transcript.toLowerCase().includes('minutes')) {
      // Process as exercise
      const exerciseData = {
        type: 'General Exercise',
        duration: 30,
        calories: 200,
        description: transcript,
      };
      handleAddExercise(exerciseData);
      setActiveTab('exercise');
    } else {
      // Process as food
      const foodData = {
        description: transcript,
        calories: 250,
        protein: 15,
        carbs: 20,
        fat: 10,
      };
      handleAddFood(foodData);
      setActiveTab('nutrition');
    }
  };

  // Calculate current totals
  const currentTotals = foodEntries.reduce(
    (totals, entry) => ({
      calories: totals.calories + entry.calories,
      protein: totals.protein + entry.protein,
      carbs: totals.carbs + entry.carbs,
      fat: totals.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const exerciseCalories = exerciseEntries.reduce((total, entry) => total + entry.calories, 0);

  const dashboardData = {
    calories: { current: currentTotals.calories, target: 1800 },
    protein: { current: currentTotals.protein, target: 110 },
    carbs: { current: currentTotals.carbs, target: 180 },
    fat: { current: currentTotals.fat, target: 75 },
    exercise: { calories: exerciseCalories },
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl shadow-strong">
              <img 
                src={heroImage} 
                alt="VitalTrack Nutrition" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h1 className="text-2xl font-bold mb-1">VitalTrack</h1>
                <p className="text-white/90 text-sm">Your voice-first nutrition companion</p>
              </div>
            </div>

            {/* Dashboard */}
            <DailyDashboard data={dashboardData} />
          </div>
        );

      case 'nutrition':
        return (
          <NutritionEntry 
            entries={foodEntries}
            onAddEntry={handleAddFood}
            onEditEntry={handleEditFood}
          />
        );

      case 'voice':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Voice Assistant</h2>
              <p className="text-muted-foreground">
                Tell me what you ate or how you exercised
              </p>
            </div>
            
            <VoiceRecorder 
              onTranscription={handleVoiceTranscription}
              placeholder="Tap and speak naturally..."
            />

            <Card className="p-4 bg-muted/30 shadow-soft">
              <h3 className="font-semibold text-foreground mb-2">Quick Examples:</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• "I had oatmeal with banana and almonds"</p>
                <p>• "30 minutes of strength training"</p>
                <p>• "Grilled chicken salad with olive oil"</p>
                <p>• "45 minute run, burned 400 calories"</p>
              </div>
            </Card>
          </div>
        );

      case 'exercise':
        return (
          <ExerciseEntry 
            exercises={exerciseEntries}
            onAddExercise={handleAddExercise}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
