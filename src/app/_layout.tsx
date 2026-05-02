import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../contexts/ThemeContext';

SplashScreen.preventAutoHideAsync(); 

export default function RootLayout() {
  const [ loaded, error ] = useFonts({
    'SpaceGroteskRegular': require('@/assets/fonts/Space_Grotesk/static/SpaceGrotesk-Regular.ttf'),
    'SpaceGroteskBold': require('@/assets/fonts/Space_Grotesk/static/SpaceGrotesk-Bold.ttf')
  }); 

  useEffect(() => {
    if (loaded || error) 
      SplashScreen.hideAsync(); 
  }, [loaded, error]); 

  if (!loaded && !error) 
    return null; 
  
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <Stack 
          screenOptions={{ headerShown: false, }} 
        />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
