import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Square, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  placeholder?: string;
  isListening?: boolean;
}

export function VoiceRecorder({ onTranscription, placeholder = "Tap to speak...", isListening: externalListening }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState('');

  // Simulate recording states for demo
  const startRecording = () => {
    setIsRecording(true);
    setTranscript('');
    
    // Simulate audio level changes
    const interval = setInterval(() => {
      setAudioLevel(Math.random() * 100);
    }, 100);

    // Auto-stop after 5 seconds for demo
    setTimeout(() => {
      clearInterval(interval);
      stopRecording();
    }, 5000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setAudioLevel(0);
    
    // Simulate transcript
    const sampleText = "I had scrambled eggs with spinach and two slices of whole grain toast for breakfast";
    setTranscript(sampleText);
    onTranscription(sampleText);
  };

  const isListening = externalListening || isRecording;

  return (
    <Card className="p-6 bg-gradient-primary border-0 shadow-medium">
      <div className="text-center space-y-6">
        {/* Voice Visualization */}
        <div className="relative flex items-center justify-center h-32">
          <div className={cn(
            "absolute inset-0 rounded-full border-4 transition-all duration-300",
            isListening 
              ? "border-white/30 animate-pulse" 
              : "border-white/20"
          )}>
            {/* Audio level bars */}
            {isListening && (
              <div className="absolute inset-4 flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-white/60 rounded-full transition-all duration-100"
                    style={{
                      height: `${20 + (audioLevel + i * 10) % 60}px`,
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Main microphone button */}
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            size="lg"
            className={cn(
              "relative z-10 w-20 h-20 rounded-full transition-all duration-300 shadow-strong",
              isListening
                ? "bg-accent hover:bg-accent/90 text-accent-foreground scale-110"
                : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
            )}
          >
            {isRecording ? (
              <Square className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>
        </div>

        {/* Status and Instructions */}
        <div className="space-y-2">
          <p className="text-white/90 font-medium">
            {isRecording 
              ? "Listening..." 
              : transcript 
                ? "Tap to record again" 
                : placeholder
            }
          </p>
          
          {transcript && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white/80 text-sm">
              "{transcript}"
            </div>
          )}
          
          {!isRecording && !transcript && (
            <p className="text-white/60 text-sm">
              Tell me what you ate or how you exercised
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}