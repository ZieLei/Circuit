import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ziel.circuit',
  appName: 'circuit',
  webDir: 'www',

  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1d4ed8',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      ionSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
