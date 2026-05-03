import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/Text';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../theme';

export default function Settings() {
    const { theme, toggleTheme } = useTheme(); 
    return (
        <View style={{
            flex: 1, 
            backgroundColor: theme.background, 
        }}>
            <SafeAreaView
                style={{
                    justifyContent: 'center', 
                    alignItems: 'center', 
                }}
            >
                <Text
                    weight='bold'
                    style={{
                        fontSize: themes.fonts.sizes.heading,
                    }}
                >
                    settings
                </Text>
            </SafeAreaView>

            <View
                style={{
                    padding: 20, 
                }}
            >
                <Text
                    weight='bold'
                    style={{
                        fontSize: themes.fonts.sizes.subHeading,
                    }}
                >
                    colors
                </Text>

                <View
                    style={{
                        backgroundColor: theme.cardBg,
                        padding: 15,
                        borderRadius: themes.spacing.borderRadius,
                        marginTop: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text>
                            Theme
                        </Text>

                        <TouchableOpacity
                            onPress={toggleTheme}
                        >
                            <View style={{
                                flexDirection: 'row', 
                                alignItems: 'center',
                                gap: 10,
                                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                padding: 10,
                                borderRadius: themes.spacing.borderRadius,
                            }}>
                                <Feather name={theme === themes.lightColors ? 'sun' : 'moon'} size={20} color={theme.text} />

                                <Text>
                                    {theme === themes.lightColors ? 'Light' : 'Dark'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}