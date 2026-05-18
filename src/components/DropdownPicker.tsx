import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../theme';
import Text from './Text';

type DropdownItemProps = {
    label: string; 
    onPress: () => void;
}

type DropdownPickerProps = {
    items: DropdownItemProps[]; 
    defaultLabel?: string; 
    dialogPosition: 'top' | 'bottom'; 
}; 

function DropdownItem({ label, onPress }: DropdownItemProps) {
    const { theme } = useTheme(); 
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                padding: 10,
                backgroundColor: theme.cardBg,
            }}
        >
            <Text>{label}</Text>
        </TouchableOpacity>
    );
}

export default function DropdownPicker({items, defaultLabel, dialogPosition}: DropdownPickerProps) {
    const { theme } = useTheme(); 
    const [ isDialogOpen, setIsDialogOpen ] = useState(false); 
    const [ chosenItem, setChosenItem ] = useState<string>(defaultLabel ? defaultLabel : 'Select an option');

    const handleItemPress = (item: DropdownItemProps) => {
        setChosenItem(item.label);
        setIsDialogOpen(false);
        item.onPress();
    }

    return (
        <TouchableOpacity
            style={{
                padding: 10, 
                borderRadius: themes.spacing.borderRadius, 
                backgroundColor: theme.cardBg, 
            }}
            onPress={() => setIsDialogOpen(!isDialogOpen)}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text>{chosenItem}</Text>
                <Feather name={isDialogOpen ? ((dialogPosition === 'bottom') ? 'chevron-up' : 'chevron-down') : ((dialogPosition === 'bottom') ? 'chevron-down' : 'chevron-up')} size={20} color={theme.text} />
            </View>
            {isDialogOpen && (
                <Animated.View
                    style={{
                        borderRadius: themes.spacing.borderRadius, 
                        backgroundColor: theme.cardBg, 
                        position: 'absolute',
                        [dialogPosition]: -125, 
                        width : '100%',
                        zIndex: 10,
                        overflow: 'hidden',
                        alignSelf: 'center',
                    }}    
                    entering={(dialogPosition === 'top') ? FadeInDown.duration(100) : FadeInUp.duration(100)}
                    exiting={(dialogPosition === 'top') ? FadeOutDown.duration(100) : FadeOutUp.duration(100)}
                >
                    {items.map((item, index) => (
                        <DropdownItem
                            key={index}
                            label={item.label}
                            onPress={() => handleItemPress(item)}
                        />
                    ))}
                </Animated.View>
            )}
        </TouchableOpacity>
    ); 
}