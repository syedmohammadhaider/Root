import { View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useTheme } from '../contexts/ThemeContext';

interface ProgressBarProps {
    width: number; 
    progress: number; 
}; 

export default function ProgressBar({ width, progress }: ProgressBarProps) {

    const { theme } = useTheme(); 


    return (
        <Animated.View
            style={{
                width: width,
                height: 5,
            }}
            layout={LinearTransition}
        >
            <View 
                style={{
                    position: 'absolute',
                    backgroundColor: theme.progressInactive, 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: 2.5
                }}
            />
            <Animated.View 
                style={{
                    position: 'absolute', 
                    backgroundColor: theme.progressActive,
                    width: `${Math.min(progress, 100)}%`,
                    height: '100%', 
                    borderRadius: 2.5
                }}
                layout={LinearTransition}
            />
        </Animated.View>
    );
}