import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Utensils, Activity, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'voice', label: 'Voice', icon: Mic },
    { id: 'exercise', label: 'Exercise', icon: Activity },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-strong">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="grid grid-cols-4 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center space-y-1 h-auto py-2 px-2 transition-all",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-all",
                  isActive && "scale-110",
                  tab.id === 'voice' && isActive && "text-accent"
                )} />
                <span className="text-xs font-medium">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}