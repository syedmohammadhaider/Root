import Header from '@/src/components/Header';
import HeaderIconButton from '@/src/components/HeaderIconButton';
import { themes } from '@/src/theme';
import { useRouter } from 'expo-router';
import { ScrollView, Switch, View } from 'react-native';
import Text from '../../components/Text';
import { useTheme } from '../../contexts/ThemeContext';

export default function AppearanceSettings() {
    const { theme, isDark, toggleTheme } = useTheme(); 
    const router = useRouter(); 
    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Header
                title="appearance"
                leftButton={<HeaderIconButton onPress={() => router.back()} icon='arrow-left' />}
            />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
                
                <View
                    style={{
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 10, 
                        backgroundColor: theme.cardBg, 
                        borderRadius: themes.spacing.borderRadius,
                    }}
                >
                    <Text
                        style={{
                            fontSize: themes.fonts.sizes.body,
                        }}
                    >
                        Dark Mode
                    </Text>
                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        thumbColor={theme.text}
                        trackColor={{ false: '#00000055', true: '#ffffff55' }}
                    />
                </View>
            </ScrollView>
        </View>
    ); 
}