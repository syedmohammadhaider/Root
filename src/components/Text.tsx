import { ReactNode } from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../theme';

export default function Text({ weight = 'regular', style, children } : { weight?: 'regular' | 'bold', style?: TextStyle, children: ReactNode}) {
    const { theme } = useTheme();  
    return (
        <RNText style={[{
            fontFamily: (weight === 'bold') ? themes.fonts.heading : themes.fonts.body,
            color: theme.text, 
        }, style]}>
            { children } 
        </RNText>
    )
}