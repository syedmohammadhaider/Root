import { Feather } from '@expo/vector-icons';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../theme';

interface IconButtonProps { 
    iconName: React.ComponentProps<typeof Feather>['name'], 
    type: "primary"|"secondary" 
    onPress?: (e?: GestureResponderEvent) => void; 
}

export default function IconButton({ iconName, type, onPress }: IconButtonProps) {
    const { theme } = useTheme(); 
    
    return (
        <TouchableOpacity
            style={{
                backgroundColor: (type === 'primary') ? theme.buttonPrimary : theme.buttonSecondary,
                paddingVertical: 18,
                paddingHorizontal: 32,
                borderRadius: 36,
            }}
            onPress={onPress}
        >
            <Feather 
                name={iconName} 
                color={(type === 'primary') ? theme.buttonPrimaryText : theme.buttonSecondaryText} 
                size={themes.fonts.sizes.subHeading}
            />
        </TouchableOpacity>
    );
}