import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import HeaderIconButton from '../components/HeaderIconButton';
import Text from '../components/Text';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../theme';

type SettingButtonProps = {
    name: string; 
    iconName: React.ComponentProps<typeof Feather>['name']; 
    children?: React.ReactNode;
    onPress?: () => void; 
}; 

function SettingButton({ name, iconName, children, onPress }: SettingButtonProps) {
    const { theme } = useTheme(); 
    
    return (
        <TouchableOpacity
            style={{
                backgroundColor: theme.cardBg,
                padding: 15,
                marginVertical: 5, 
            }}
            onPress={onPress}
            disabled={!onPress}
        >
            <View
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row', 
                        alignItems: 'center',
                        gap: 10,
                    }}
                >
                    <Feather name={iconName} size={20} color={theme.text} />
                    <Text
                        style={{
                            fontSize: themes.fonts.sizes.body,
                        }}
                    >
                        {name}
                    </Text>
                </View>

                <Feather name='chevron-right' size={20} color={theme.text} />
            </View>
        </TouchableOpacity>
    ); 
}

export default function Settings() {
    const { theme, toggleTheme } = useTheme(); 
        const router = useRouter(); 
    return (
        <View style={{
            flex: 1, 
            backgroundColor: theme.background, 
        }}>
            <Header
                title="settings"
                leftButton={<HeaderIconButton onPress={() => router.back()} icon='arrow-left' />}
            />

            <View
                style={{
                    paddingHorizontal: 20, 
                }}
            >

                <View
                    style={{
                        backgroundColor: theme.cardBg,
                        borderRadius: themes.spacing.borderRadius,
                        marginTop: 10,
                    }}
                >
                    <SettingButton name='Appearance' iconName='droplet' onPress={() => router.push('/(settings)/appearance')} />
                    <SettingButton name='Notifications' iconName='bell' />
                </View>

                <View
                    style={{
                        backgroundColor: theme.cardBg,
                        borderRadius: themes.spacing.borderRadius,
                        marginTop: 10,
                    }}
                >
                    <SettingButton name='Export logs' iconName='file-text' />
                    <SettingButton name='Delete all logs' iconName='alert-octagon' />
                </View>

                <View
                    style={{
                        backgroundColor: theme.cardBg,
                        borderRadius: themes.spacing.borderRadius,
                        marginTop: 10,
                    }}
                >
                    <SettingButton name='About' iconName='info' />
                </View>
            </View>
        </View>
    );
}