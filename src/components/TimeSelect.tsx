import { useRef, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../theme';

type TimeSelectProps = TextInputProps & {
    chosenTime: number; 
    maxValue?: number;
    size?: 'regular' | 'small'; 
    onUpdate?: (newNumber: number) => void;
};

export default function TimeSelect({ chosenTime, maxValue=59, size='regular', onUpdate, ...rest }: TimeSelectProps) {
    const { theme } = useTheme(); 
    const [ inputValue, setInputValue ] = useState<number>(0); 
    const [ focused, setFocused ] = useState<boolean>(false); 

    const TextInputRef = useRef<TextInput>(null); 

    return (
        <View
            style={{
                backgroundColor: theme.cardBg,
                aspectRatio: 1, 
                height: (size === 'regular') ? 75 : 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: focused ? theme.text : 'transparent', 
                borderRadius: themes.spacing.borderRadius
            }}
        >
            <TextInput
                ref={TextInputRef}
                style={{ 
                    fontSize: (size === 'regular') ? themes.fonts.sizes.heading : themes.fonts.sizes.subHeading,
                    fontFamily: themes.fonts.heading,
                    color: theme.text
                }}
                keyboardType='numeric'
                defaultValue={chosenTime.toString().padStart(2, '0')}
                onChangeText={(t) => {
                    setInputValue(Number(t));
                    onUpdate && onUpdate(Math.min(Number(t), maxValue)); 
                }}
                onFocus={() => {
                    TextInputRef.current?.clear();
                    setFocused(true); 
                }}
                onBlur={() => {
                    setFocused(false);
                    TextInputRef.current?.setNativeProps({ 
                        text: (Math.min(inputValue, maxValue)).toString().padStart(2, '0')
                    }); 
                    onUpdate && onUpdate(Math.min(inputValue, maxValue));
                }}
                {...rest} 
            />
        </View>
    )
}