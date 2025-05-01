import 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';

import ApplicationNavigator from '@/navigation/Application';
import { ThemeProvider } from '@/theme';
import '@/translations';

import RNUxcam from 'react-native-ux-cam';

RNUxcam.optIntoSchematicRecordings(); // Add this line to enable iOS screen recordings
const configuration = {
  userAppKey: '0zapkjp4hbxedc8',
  enableAutomaticScreenNameTagging: false,
  enableAdvancedGestureRecognition: true, // default is true
  enableImprovedScreenCapture: true, // for improved screen capture on Android
  occlusions: [],
}
RNUxcam.startWithConfiguration(configuration);

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

export const storage = new MMKV();

function App() {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>
          <ApplicationNavigator />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
