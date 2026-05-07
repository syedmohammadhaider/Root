import { themes } from '@/src/theme';
import { ScrollView, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../../components/Text';
import { useTheme } from '../../contexts/ThemeContext';

export default function AppearanceSettings() {
    const { theme, isDark, toggleTheme } = useTheme(); 
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
                <Text
                    weight='bold'
                    style={{
                        fontSize: themes.fonts.sizes.heading, 
                        marginBottom: 20,
                        textAlign: 'center',
                    }}
                >
                    appearance
                </Text>

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
                        Theme
                    </Text>
                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        thumbColor={theme.text}
                        trackColor={{ false: '#00000055', true: '#ffffff55' }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    ); 
}