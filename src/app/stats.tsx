import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/Text';
import { useTheme } from '../contexts/ThemeContext';
import { loadData } from '../services/storage';
import { themes } from '../theme';

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
            <SafeAreaView>
                <Text weight='bold' style={{ fontSize: themes.fonts.sizes.heading }}>stats</Text>
            </SafeAreaView>

            <ScrollView>
                {logs.map((log, index) => (
                    <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: theme.text }}>
                        <Text>Session {index + 1}</Text>
                        <Text>Mode: {log.mode}</Text>
                        <Text>Duration: {formatTime(log.completedDuration)}</Text>
                        <Text>Date: {new Date(log.timestamp).toLocaleString()}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}