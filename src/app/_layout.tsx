import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
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
    <ThemeProvider>
      <Stack 
        screenOptions={{ headerShown: false, }} 
      />
    </ThemeProvider>
  );
}
