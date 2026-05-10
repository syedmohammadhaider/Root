import { useRouter } from 'expo-router';
import { useState } from "react";
import { Keyboard, ToastAndroid, TouchableWithoutFeedback, View } from "react-native";
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';

import IconButton from "../components/IconButton";
import Text from "../components/Text";
import TimeSelect from "../components/TimeSelect";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropdownPicker from '../components/DropdownPicker';
import Header from '../components/Header';
import HeaderIconButton from '../components/HeaderIconButton';
import { useTheme } from "../contexts/ThemeContext";
import { themes } from "../theme";

export default function Index() {
  const { theme } = useTheme(); 

  const [ hours, setHours ] = useState<number>(0); 
  const [ minutes, setMinutes ] = useState<number>(45); 
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                { label: 'Pomodoro', onPress: () => setTimerMode('pomodoro') },
                { label: 'Infinity', onPress: () => setTimerMode('infinity') },
              ]}
              dialogPosition='top'
            />  
          
          </View>

            {(timerMode !== 'infinity') && (<View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15
              }}
            >
              <TimeSelect 
                chosenTime={hours}
                maxValue={12}
                onUpdate={setHours}
              />

              <Text weight='bold' style={{ fontSize: themes.fonts.sizes.heading }}>:</Text>

              <TimeSelect 
                chosenTime={minutes}
                onUpdate={setMinutes}
              />

              <Text weight='bold' style={{ fontSize: themes.fonts.sizes.heading }}>:</Text>
              
              <TimeSelect 
                chosenTime={seconds}
                onUpdate={setSeconds}
              />

              {/* <Text weight='bold' style={{ fontSize: themes.fonts.sizes.heading }}>m</Text> */}
            </View>)}

            {(timerMode === 'pomodoro') && (<View style={{
              flexDirection: 'row', 
              justifyContent: 'center',
            }}>
              <TimeSelect
                chosenTime={5}
                maxValue={59}
                onUpdate={setRestMinutes}
                size='small'
              />

              <Text weight='bold' style={{ fontSize: themes.fonts.sizes.subHeading}}> : </Text>

              <TimeSelect
                chosenTime={0}
                maxValue={59}
                onUpdate={setRestSeconds}
                size='small'
              />
            </View>)}

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
            height: '30%', 
            position: 'absolute', 
            bottom: 0,
            padding: 25, 
          }}>
            <Text style={{ opacity: 0.5, }}>
              Swipe up for logs and statistics
            </Text>
          </View>
        </GestureDetector>
      </View>
    </TouchableWithoutFeedback>
  );
}
