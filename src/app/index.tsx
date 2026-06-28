import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { ToastAndroid, View } from "react-native";
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import { TimerPicker } from 'react-native-timer-picker';

import IconButton from "../components/IconButton";
import Text from "../components/Text";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropdownPicker from '../components/DropdownPicker';
import Header from '../components/Header';
import HeaderIconButton from '../components/HeaderIconButton';
import { useTheme } from "../contexts/ThemeContext";
import { themes } from "../theme";

export default function Index() {
  const { theme } = useTheme(); 

  const [ hours, setHours ] = useState<number>(0); 
  const [ minutes, setMinutes ] = useState<number>(30); 
  const [ seconds, setSeconds ] = useState<number>(0); 
  const [ restMinutes, setRestMinutes ] = useState<number>(5);
  const [ restSeconds, setRestSeconds ] = useState<number>(0);  
  const [ timerMode, setTimerMode ] = useState<'classic'|'pomodoro'|'infinity'>('classic'); 

  const router = useRouter(); 

  const handleStart = () => {
    let totalDurationInSeconds = hours*3600 + minutes*60 + seconds; 
    let totalRestDurationInSeconds = restMinutes*60 + restSeconds; 

    if (totalDurationInSeconds <= 0) {
      ToastAndroid.showWithGravity("Invalid duration!", ToastAndroid.SHORT, ToastAndroid.BOTTOM); 
      return; 
    }

    router.navigate({
      pathname: '/timer', 
      params: {
        duration: totalDurationInSeconds,
        rest: totalRestDurationInSeconds,
        mode: timerMode,
      }
    }); 
  };

  const flingGesture = Gesture.Fling()
    .direction(Directions.UP)
    .runOnJS(true)
    .onEnd(() => router.push('/stats'));
  
  return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: theme.background
        }}
      >
        <Header 
          title="root"
          rightButton={<HeaderIconButton onPress={() => router.push('/settings')} icon='sliders' />}
        />

        <View style={{
          flex: 1, 
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}>
          <View
            style={{
              width: 150,
              backgroundColor: theme.cardBg,
              borderRadius: themes.spacing.borderRadius,
            }}
          >
            <DropdownPicker
              items={[
                { label: 'Classic', onPress: () => setTimerMode('classic') },
                // { label: 'Pomodoro', onPress: () => setTimerMode('pomodoro') },
                { label: 'Infinity', onPress: () => setTimerMode('infinity') },
              ]}
              defaultLabel={timerMode.charAt(0).toUpperCase() + timerMode.slice(1)}
              dialogPosition='bottom'
            />  
          
          </View>

          {timerMode !== 'infinity' && (
            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
              <TimerPicker
                initialValue={{ hours: hours, minutes: minutes, seconds: seconds }}
                hideSeconds={true}
                padHoursWithZero={true}
                onDurationChange={(value) => {
                  setHours(value.hours);
                  setMinutes(value.minutes);
                  setSeconds(value.seconds);
                }}
                padWithNItems={0}
                LinearGradient={LinearGradient}
                MaskedView={MaskedView}
                styles={{
                  theme: 'dark', 
                  backgroundColor: theme.background,
                  text: {
                      fontFamily: themes.fonts.heading,
                      color: theme.text, 
                  },
                  pickerItem: {
                    fontSize: themes.fonts.sizes.heading,
                    color: theme.text,
                  },
                  pickerLabel: {
                    fontSize: 16,
                    color: theme.text,
                    opacity: 0.7,
                  },
                  pickerContainer: {
                    borderRadius: themes.spacing.borderRadius,
                    width: '60%',
                    alignSelf: 'center',
                  },
                }}
              />
            </View>
          )}

          {(timerMode === 'infinity') && 
            (
              <View>
                <MaterialCommunityIcons name='infinity' size={72} color={theme.text} />
              </View>
            )
          }

          <IconButton 
            iconName="play" 
            type="primary" 
            onPress={handleStart}
          />
        </View>
        
        <GestureDetector 
          gesture={flingGesture}
        >
          <View style={{
            // backgroundColor: theme.cardBg,
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'absolute',
            height: '25%', 
            bottom: 0,
            padding: 25, 
          }}>
            <Text style={{ opacity: 0.5, }}>
              Swipe up for logs and statistics
            </Text>
          </View>
        </GestureDetector>
      </View>
  );
}