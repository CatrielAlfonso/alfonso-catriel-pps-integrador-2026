import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.pps.admincat',
  appName: 'Admincat',
  webDir: 'www',
  "server": {
    "androidScheme": "https"
  }
};

export default config;
