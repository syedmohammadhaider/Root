import Header from '@/src/components/Header';
import HeaderIconButton from '@/src/components/HeaderIconButton';
import Text from '@/src/components/Text';
import { useTheme } from '@/src/contexts/ThemeContext';
import { themes } from '@/src/theme';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';

/* 
* TODO: 
* - ADD LOGO
* - ADD APP REVIEW LINK 
* - ADD PRIVACY POLICY LINK
* - ADD SUPPORT LINK
*/

export default function About() {
    const { theme } = useTheme(); 
    const router = useRouter(); 
    return (
        <View
            style={{
                backgroundColor: theme.background, 
                flex: 1, 
            }}
        >
            <Header 
                title='about' 
                leftButton={<HeaderIconButton icon='arrow-left' onPress={() => router.navigate('/settings')} />}
            />
            <ScrollView
                contentContainerStyle={{
                    padding: 10, 
                    gap: 10,
                }}
            >
                <View
                    style={{
                        width: '100%', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                    }}
                >
                    {/* Add logo here */}
                    <View style={{ height: 128, aspectRatio: 1, backgroundColor: theme.text, borderRadius: themes.spacing.borderRadius }} />
                    <Text 
                        weight="bold"
                        style={{
                            fontSize: themes.fonts.sizes.subHeading ,
                            textAlign: 'center',
                        }}
                    >
                        root
                    </Text>
                </View>
                
                <View
                    style={{
                        backgroundColor: theme.cardBg, 
                        padding: 15, 
                        borderRadius: themes.spacing.borderRadius,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                        <Text
                            style={{
                                fontSize: themes.fonts.sizes.body
                            }}
                        >
                            Version
                        </Text>
                        <Text
                            style={{
                                fontSize: themes.fonts.sizes.body
                            }}
                        >
                            0.1.0
                        </Text>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: theme.cardBg, 
                        padding: 15, 
                        borderRadius: themes.spacing.borderRadius,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 15,
                    }}
                    /* Add onPress after creating listing */
                >
                        <Feather name='star' size={themes.fonts.sizes.body} color={theme.text} />
                        <Text
                            style={{
                                fontSize: themes.fonts.sizes.body
                            }}
                        >
                            Rate on Google Play Store
                        </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: theme.cardBg, 
                        padding: 15, 
                        borderRadius: themes.spacing.borderRadius,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 15,
                    }}
                    /* Add onPress after creating privacy policy */
                >
                        <Feather name='file-text' size={themes.fonts.sizes.body} color={theme.text} />
                        <Text
                            style={{
                                fontSize: themes.fonts.sizes.body
                            }}
                        >
                            Privacy Policy
                        </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: theme.cardBg, 
                        padding: 15, 
                        borderRadius: themes.spacing.borderRadius,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 15,
                    }}
                    /* Add onPress */
                >
                        <Feather name='help-circle' size={themes.fonts.sizes.body} color={theme.text} />
                        <Text
                            style={{
                                fontSize: themes.fonts.sizes.body
                            }}
                        >
                            Support
                        </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    ); 
}