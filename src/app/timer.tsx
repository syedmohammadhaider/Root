import { useLocalSearchParams, useRouter } from "expo-router";
import { Accelerometer } from 'expo-sensors';
import { useEffect, useRef, useState } from "react";
import { AppState, EventSubscription, Pressable, View } from "react-native";
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import IconButton from "../components/IconButton";
import ProgressBar from "../components/ProgressBar";
import Text from "../components/Text";
import { useTheme } from "../contexts/ThemeContext";
import { saveData } from "../services/storage";
import { themes } from "../theme";

const ACCELEROMETER_THRESHOLD = 1.5; 

export default function Timer() {
    const PROGRESS_BAR_WIDTH = 160; 
    const PROGRESS_BAR_GAP = 20;

    const { theme } = useTheme(); 

    const { duration, rest, mode } = useLocalSearchParams(); 
    const router = useRouter(); 

    const [ timeElapsed, setTimeElapsed ] = useState<number>(0); 
    const [ totalUnskippedTime, setTotalUnskippedTime ] = useState<number>(0); 
    const [ timerRunning, setTimerRunning ] = useState<boolean>(true); 
    const [ isResting, setIsResting ] = useState<boolean>(false); 
    const [ isFinished, setIsFinished ] = useState<boolean>(false); 
    const [ isStopped, setIsStopped ] = useState<boolean>(false); 
    const [ { x, y, z }, setAccelData ] = useState({ x: 0, y: 0, z: 0 }); 
    const [ accelSubscription, setAccelSubscription ] = useState<EventSubscription | null>(null); 

    const appState = useRef(AppState.currentState); 
    const [ appStateVisible, setAppStateVisible ] = useState(appState.current); 

    const totalSessions = useRef<number>(3); 
    const currentSession = useRef<number>(1);  // 1-indexed
    
    const targetDuration = isResting ? Number(rest) : Number(duration); 

    const _accelSubscribe = () => { setAccelSubscription(Accelerometer.addListener(setAccelData)); }; 
    const _accelUnsubscribe = () => { 
        accelSubscription && accelSubscription.remove(); 
        setAccelSubscription(null); 
     };

    const formatTime = (time: number) => {
        const seconds = time % 60; 
        const minutes = Math.floor(time / 60) % 60; 
        const hours = Math.floor(time / 3600); 
        
        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
    };

    const findPomodoroTime = (index: number) => {
        if (index + 1 < currentSession.current) 
            return 100;
        else if (index + 1 > currentSession.current) 
            return 0; 
        return (timeElapsed / targetDuration) * 100; 
    }

    const handleFinish = (finalTime: number, interrupted=false) => {
        if (mode === 'pomodoro') {
            const totalSteps = totalSessions.current * 2 - 1;

            if (currentSession.current % 2 !== 0) 
                setTotalUnskippedTime(t => t+finalTime); 

            if (currentSession.current < totalSteps) {
                currentSession.current += 1;
                setIsResting(!isResting);
                setTimeElapsed(0);
            } else {
                setTimerRunning(false);
                setIsFinished(true);
                saveData({
                    id: Date.now().toString(), 
                    completedDuration: finalTime,
                    totalDuration: +duration,
                    timestamp: Date.now(),
                    mode: 'pomodoro'
                });
                console.log("ALL SESSIONS FINISHED");
            }
            return;
        }

        setTimerRunning(false); 
        // common finish logic
        if (!interrupted) setIsFinished(true); 
        saveData({
            id: Date.now().toString(), 
            completedDuration: finalTime,
            totalDuration: +duration,
            timestamp: Date.now(),
            mode: (mode === 'classic' || mode === 'pomodoro' || mode === 'infinity') ? mode : 'infinity'
        });
        console.log("FINISHED");
    };

    const handleStop = () => {
        if (!timerRunning) {
            router.navigate('/')
            return; 
        } 

        setTimerRunning(false); 
        setIsResting(false); 
        if (mode !== 'infinity')
            setIsStopped(true); 

        handleFinish(timeElapsed, true);
    };

    const handleSkip = () => {
        handleFinish(timeElapsed); 
    }

    /*const handleInterrupt = () => {
        // if (!isFinished && !isStopped) return; 
        if (!timerRunning) return; 

        saveData({
            id: Date.now().toString(), 
            completedDuration: timeElapsed,
            totalDuration: +duration,
            timestamp: Date.now(),
            mode: (mode === 'classic' || mode === 'pomodoro' || mode === 'infinity') ? mode : 'infinity'
        });
        setTimerRunning(false); 
        setIsStopped(true); 
        setIsResting(false); 
        console.log("INTERRUPTED");
    }; */

    const handleInterrupt = () => {
        if (!timerRunning || isResting) return;

        if (mode === 'pomodoro') currentSession.current = totalSessions.current * 2 - 1;;

        handleFinish(totalUnskippedTime, true); 
    };

    const handleRetry = () => {
        router.push({
            pathname: '/timer',
            params: {
                duration: duration, 
                rest: rest, 
                mode: mode,
            }
        });
    };

    useEffect(() => {
        let interval: any;
        if (mode !== 'pomodoro') 
            currentSession.current = totalSessions.current;
        if (timerRunning) {
            interval = setInterval(() => {
                setTimeElapsed((prev) => {
                    const nextTime = prev + 1;

                    if (mode === 'infinity') return nextTime;
                    
                    if (nextTime >= targetDuration) {
                        // Pass nextTime (which is the actual final count)
                        handleFinish(nextTime); 
                        return nextTime;
                    }
                    return nextTime;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timerRunning, targetDuration]);

    useEffect(() => {
        if (!timerRunning) return; 
        if (Math.sqrt(x*x + y*y + z*z) >= ACCELEROMETER_THRESHOLD)
            handleInterrupt(); 
    }, [x, y, z]);

    useEffect(() => {
        _accelSubscribe(); 
        return () => _accelUnsubscribe(); 
    }, []);

    useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', nextAppState => {
      
      if (nextAppState === 'background') {
        handleInterrupt(); 
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState:', appState.current);
    });

    return () => {
      appStateSubscription.remove();
    };
  }, []);

    return (
        <Pressable
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.background
            }}
            onPress={handleInterrupt}
        >

            {/* Main Container */}
            <View style={{
                alignItems: 'center',
                gap: 15,
            }}>

                {/* Animated Texts */}
                {
                    (isFinished) && (
                        <Animated.View
                            layout={LinearTransition}
                            entering={FadeInDown}
                        >
                            <Text>Completed successfully!</Text>
                        </Animated.View>
                    )  
                }

                {
                    (isStopped) && (
                        <Animated.View
                            layout={LinearTransition}
                            entering={FadeInDown}
                        >
                            <Text>Session terminated.</Text>
                        </Animated.View>
                    )  
                }
                
                {/* Progress bar - Pomodoro */}
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 5,
                    }}
                >
                    {(mode === 'pomodoro') && (
                        [...Array(totalSessions.current * 2 - 1)].map((_, index) => (
                            <ProgressBar 
                                width={(index % 2 === 0) ? Math.floor(PROGRESS_BAR_WIDTH / totalSessions.current) : PROGRESS_BAR_GAP}
                                progress={findPomodoroTime(index)}
                                key={index}
                            />
                        ))
                    )}
                </View>

                {/* Progress bar - Classic */}
                {(mode === 'classic') && <ProgressBar width={PROGRESS_BAR_WIDTH} progress={(timeElapsed / targetDuration) * 100} />}
                
                {/* Timer */}
                <Text
                    weight="bold"
                    style={{
                        fontSize: themes.fonts.sizes.heading
                    }}
                >
                    { (mode === 'classic' || mode === 'pomodoro') ? formatTime(Math.max(targetDuration - timeElapsed, 0)) : formatTime(Math.max(timeElapsed, 0)) }
                </Text>
                
                {/* Button Group */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 10,
                    }}
                >
                    <Animated.View
                        layout={LinearTransition}
                    >
                        <IconButton 
                            iconName={(timerRunning) ? "square" : "arrow-left"}
                            type="secondary"
                            onPress={handleStop}
                        />
                    </Animated.View>

                    {
                        (mode === 'pomodoro' && (timerRunning || isResting) && (currentSession.current < 2*totalSessions.current-1)) && 
                        (
                            <Animated.View
                                layout={LinearTransition}
                            >   
                                <IconButton 
                                    iconName="skip-forward" 
                                    type="primary"
                                    onPress={handleSkip}
                                />
                            </Animated.View>
                        )
                    }

                    {
                        (!timerRunning) && 
                        (
                            <Animated.View
                                layout={LinearTransition}
                            >
                                <IconButton 
                                    iconName="rotate-cw" 
                                    type="primary"
                                    onPress={handleRetry}
                                />
                            </Animated.View>
                        )
                    }
                </View>
            </View>
        </Pressable>
    )
}