import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import HeaderIconButton from '../components/HeaderIconButton';
import Text from '../components/Text';
import { useTheme } from '../contexts/ThemeContext';
import { deleteData, loadData } from '../services/storage';
import { themes } from '../theme';

function LogCard({ mode, id, completedDuration, totalDuration, timestamp, onPress }: {
    mode: 'infinity' | 'classic' | 'pomodoro';
    id: number;
    completedDuration: number;
    totalDuration: number;
    timestamp: number; 
    onPress: () => void; 
}) {
    const { theme } = useTheme();
    const formatTime = (time: number) => {
        const seconds = time % 60; 
        const minutes = Math.floor(time / 60) % 60; 
        const hours = Math.floor(time / 3600); 
        
        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
    }
    const handlePress = async () => {
        Alert.alert(
            "Are you sure you want to delete this log? ",
            "You won't be able to recover this data",
            [
                {
                    text: 'Cancel', 
                    style: 'cancel'
                },
                {
                    text: 'Delete', 
                    onPress: async () => { 
                        await deleteData(id.toString()); 
                        onPress(); 
                    },
                    style: 'destructive'
                },
            ],
            {
                cancelable: true
            }
        )
    };

    return (
        <TouchableOpacity
            style={{
                backgroundColor: theme.cardBg, 
                padding: 20,
                borderRadius: themes.spacing.borderRadius,
                marginHorizontal: 20,
                marginBottom: 20,
                flexDirection: 'row', 
                justifyContent: 'space-between',
            }}
            onPress={handlePress}
        >
            <View>
                <Text 
                    weight='bold'
                    style={{ fontSize: themes.fonts.sizes.subHeading }}
                >
                    {formatTime(completedDuration)}
                </Text>
                {mode !== 'infinity' && (
                    <Text>
                        / {formatTime(totalDuration)}
                    </Text>
                )}
            </View>

            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {mode !== 'infinity' && (
                    <Text
                        weight='bold'
                        style={{ 
                            fontSize: themes.fonts.sizes.subHeading, 
                            opacity: 0.5,
                        }}
                    >
                        {(completedDuration / totalDuration * 100).toFixed(2)}%
                    </Text> 
                )}

                <Text>{new Date(timestamp).toLocaleDateString()}</Text>
            </View>
        </TouchableOpacity>
    ); 
}

export default function Stats() {
    const { theme } = useTheme();
    const [ logs, setLogs ] = useState<any[]>([]);

    const formatTime = (time: number) => {
        const seconds = time % 60; 
        const minutes = Math.floor(time / 60) % 60; 
        const hours = Math.floor(time / 3600); 
        
        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
    }

    const router = useRouter(); 

    const fetchData = async () => {
        const data = await loadData();
        setLogs(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: theme.background
            }}
        >

            <HeaderIconButton
                icon="arrow-left"
                style={{
                    position: 'absolute',
                    top: 35,
                    left: 15,
                    zIndex: 1,
                    backgroundColor: theme.background, 
                    borderWidth: 1, 
                    borderColor: theme.cardBg, 
                    borderRadius: 50, 
                    padding: 10, 
                }}
                onPress={() => router.canGoBack() && router.back()}
            />
            
            <ScrollView
                style={{
                    width: '100%',
                }}
            >

                <Header title='stats' />

                <View
                    style={{
                        backgroundColor: theme.cardBg, 
                        padding: 20,
                        borderRadius: themes.spacing.borderRadius,
                        marginHorizontal: 20,
                        justifyContent: 'center',
                        alignItems: 'center', 
                    }}
                >
                    <Text style={{ fontSize: themes.fonts.sizes.subHeading, opacity: 0.5 }}>total focus time</Text>
                    <Text weight='bold' style={{ fontSize: themes.fonts.sizes.heading }}>{formatTime(logs.reduce((acc, log) => acc + log.completedDuration, 0))}</Text>
                </View>

                <Header title='logs' />
                
                {logs.reverse().map((log, index) => (
                    <LogCard key={log.id} id={log.id} mode={log.mode} completedDuration={log.completedDuration} totalDuration={log.totalDuration} timestamp={log.timestamp} onPress={fetchData} />
                ))}
            </ScrollView>
        </View>
    );
}