import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, TouchableOpacity, View, Share } from 'react-native';
import Header from '../components/Header';
import HeaderIconButton from '../components/HeaderIconButton';
import Text from '../components/Text';
import { useTheme } from '../contexts/ThemeContext';
import { clearData, getLogData } from '../services/storage';
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

    const deleteAllLogs = async () => {
        Alert.alert(
            "Are you sure?", 
            "Pressing delete will clear all logs from your phone. It can't be recovered.", 
            [
                {
                    'text': 'Cancel', 
                    'style': 'cancel'
                }, 
                {
                    'text': 'Delete', 
                    onPress: () => clearData(),
                    'style': 'destructive',
                }
            ],
            {
                cancelable: true
            }
        )
    };

    const exportLogs = async () => {
        try {
            const logData = await getLogData();
            if (!logData) {
                Alert.alert("No data", "There are no logs to export.");
                return;
            }
            await Share.share({
                message: logData,
                title: "Export Logs",
                url: undefined,
            });
        } catch (error) {
            Alert.alert("Error", "Failed to export logs.");
            console.error("Export logs error: ", error);
        }
    };

    return (
        <View style={{
            flex: 1, 
            backgroundColor: theme.background, 
        }}>
            <Header
                title="settings"
                leftButton={<HeaderIconButton onPress={() => router.navigate('/')} icon='arrow-left' />}
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
                    <SettingButton name='Export logs' iconName='file-text' onPress={exportLogs} />
                    <SettingButton name='Delete all logs' iconName='alert-octagon' onPress={deleteAllLogs} />
                </View>

                <View
                    style={{
                        backgroundColor: theme.cardBg,
                        borderRadius: themes.spacing.borderRadius,
                        marginTop: 10,
                    }}
                >
                    <SettingButton name='About' iconName='info' onPress={() => router.navigate('/(settings)/about')} />
                </View>
            </View>
        </View>
    );
}