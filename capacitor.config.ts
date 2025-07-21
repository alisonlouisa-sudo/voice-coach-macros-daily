import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c8aa44cc75f041b59074439b294aea3c',
  appName: 'VitalTrack - Voice Nutrition Tracker',
  webDir: 'dist',
  server: {
    url: 'https://c8aa44cc-75f0-41b5-9074-439b294aea3c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;