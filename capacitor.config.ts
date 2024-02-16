import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'T1 Food App',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
