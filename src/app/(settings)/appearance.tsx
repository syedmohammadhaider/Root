import Header from '@/src/components/Header';
import HeaderIconButton from '@/src/components/HeaderIconButton';
import { loadSystemThemePreference, saveSystemThemePreference } from '@/src/services/storage';
import { themes } from '@/src/theme';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Switch, View } from 'react-native';
import Text from '../../components/Text';
import { useTheme } from '../../contexts/ThemeContext';

export default function AppearanceSettings() {
    const { theme, isDark, toggleTheme } = useTheme(); 
    const [ systemThemePref, setSystemThemePref ] = useState<boolean>(false);
    const router = useRouter(); 

    useEffect(() => {
        (async () => {
            const savedThemePref = await loadSystemThemePreference();
            setSystemThemePref(savedThemePref);
        })(); 
    }, []); 

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Header
                title="appearance"
                leftButton={<HeaderIconButton onPress={() => router.back()} icon='arrow-left' />}
            />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, marginHorizontal: 10, gap: 5, backgroundColor: theme.cardBg, borderRadius: themes.spacing.borderRadius,}}>
                
                <View
                    style={{
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 10, 
                    }}
                >
                    <Text
                        style={{
                            fontSize: themes.fonts.sizes.body,
                        }}
                    >
                        Choose System Theme
                    </Text>
                    <Switch
                        value={systemThemePref}
                        onValueChange={(value) => {
                            setSystemThemePref(value);
                            saveSystemThemePreference(value);
                        }}
                        thumbColor={theme.text}
                        trackColor={{ false: '#00000055', true: '#ffffff55' }}
                    />
                </View>

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
                        disabled={systemThemePref}
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