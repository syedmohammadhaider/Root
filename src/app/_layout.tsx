import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../contexts/ThemeContext';

NavigationBar.setVisibilityAsync('hidden');
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
        <StatusBar hidden />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
