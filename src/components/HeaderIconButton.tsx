import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function HeaderIconButton({ icon, style, onPress }: { icon: React.ComponentProps<typeof Feather>['name']; style?: ViewStyle; onPress: () => void }) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={style}
            onPress={onPress}
        >
            <Feather name={icon} size={24} color={theme.text} />
        </TouchableOpacity>
    ); 
}