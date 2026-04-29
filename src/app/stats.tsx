import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/Text';
import { useTheme } from '../contexts/ThemeContext';
import { loadData } from '../services/storage';
import { themes } from '../theme';

function LogCard({ mode, completedDuration, totalDuration, timestamp }: {
    mode: 'infinity' | 'classic' | 'pomodoro';
    completedDuration: number;
    totalDuration: number;
    timestamp: number; 
}) {
    const { theme } = useTheme();
    const formatTime = (time: number) => {
        const seconds = time % 60; 
        const minutes = Math.floor(time / 60) % 60; 
        const hours = Math.floor(time / 3600); 
        
        return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
    }

    return (
        <View
            style={{
                backgroundColor: theme.cardBg, 
                padding: 20,
                borderRadius: 10,
                marginHorizontal: 20,
                marginBottom: 20,
                flexDirection: 'row', 
                justifyContent: 'space-between',
            }}
        >
            <View>
                <Text 
                    weight='bold'
                    style={{ fontSize: themes.fonts.sizes.heading }}
                >
                    {formatTime(completedDuration)}
                </Text>
                <Text>
                    / {formatTime(totalDuration)}
                </Text>
            </View>

            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text
                    weight='bold'
                    style={{ 
                        fontSize: themes.fonts.sizes.subHeading, 
                        opacity: 0.5,
                    }}
                >
                    {(completedDuration / totalDuration * 100).toFixed(2)}%
                </Text>

                <Text>{new Date(timestamp).toLocaleDateString()}</Text>
            </View>
        </View>
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

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadData();
            setLogs(data);
        };
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
            <ScrollView
                style={{
                    width: '100%',
                }}
            >

                <SafeAreaView>
                    <Text weight='bold' style={{ fontSize: themes.fonts.sizes.heading, textAlign: 'center', }}>stats</Text>
                </SafeAreaView>

                <View
                    style={{
                        backgroundColor: theme.cardBg, 
                        padding: 20,
                        borderRadius: 10,
                        marginHorizontal: 20,
                        justifyContent: 'center',
                        alignItems: 'center', 
                    }}
                >
                    <Text style={{ fontSize: themes.fonts.sizes.subHeading, opacity: 0.5 }}>total focus time</Text>
                    <Text weight='bold' style={{ fontSize: themes.fonts.sizes.heading }}>{formatTime(logs.reduce((acc, log) => acc + log.completedDuration, 0))}</Text>
                </View>

                <Text weight='bold' style={{ fontSize: themes.fonts.sizes.heading, textAlign: 'center', marginVertical: 20, }}>logs</Text>
                
                {logs.reverse().map((log, index) => (
                    <LogCard key={log.id} mode={log.mode} completedDuration={log.completedDuration} totalDuration={log.totalDuration} timestamp={log.timestamp} />
                ))}
            </ScrollView>
        </View>
    );
}