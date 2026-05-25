import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Session {
    id: string; 
    completedDuration: number; 
    totalDuration: number;
    timestamp: number;
    mode: 'classic' | 'pomodoro' | 'infinity'; 
}; 

const DEFAULT_KEY_NAME = "@Root:Sessions"; 
const SYSTEM_THEME_KEY = "@Root:SystemTheme"; // stores preference for using system theme
const THEME_PREFERENCE_KEY = "@Root:ThemePreference"; // stores preference for dark/light themes

export const loadSystemThemePreference = async (): Promise<boolean> => {
    try {
        const response = await AsyncStorage.getItem(SYSTEM_THEME_KEY);
        return response ? JSON.parse(response) : true; 
    } catch (e) {
        console.error("Error loading system theme preference: ", e); 
        return true; 
    }
}

export const saveSystemThemePreference = async (useSystemTheme: boolean) => {
    try {
        await AsyncStorage.setItem(SYSTEM_THEME_KEY, JSON.stringify(useSystemTheme)); 
    } catch (e) {
        console.error("Error saving system theme preference: ", e); 
    }
}

export const loadThemePreference = async (): Promise<boolean> => {
    try {
        const response = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        return response ? JSON.parse(response) : false; 
    } catch (e) {
        console.error("Error loading theme preference: ", e); 
        return false; 
    }
}

export const saveThemePreference = async (isDark: boolean) => {
    try {
        await AsyncStorage.setItem(THEME_PREFERENCE_KEY, JSON.stringify(isDark)); 
    } catch (e) {
        console.error("Error saving theme preference: ", e); 
    }
}

export const loadData = async (onError?: (e: unknown) => void, key=DEFAULT_KEY_NAME) => {
    try {
        const response = await AsyncStorage.getItem(key);
        return response ? JSON.parse(response) : [];
    } catch (e) {
        onError && onError(e); 
        return [];
    }
};

export const saveData = async (data: Session, onError?: (e: unknown) => void, key=DEFAULT_KEY_NAME) => {
    const previousData: Session[] = await loadData(); 
    const newData: Session[] = [...previousData, data]; 

    try {
        await AsyncStorage.setItem(key, JSON.stringify(newData)); 
        console.log("Data saved successfully: \n", data); 
    } catch (e) {
        onError && onError(e); 
    }
};

export const deleteData = async (itemId: string, key=DEFAULT_KEY_NAME) => {
    const previousData: Session[] = await loadData(); 
    const filteredData: Session[] = previousData.filter(session => session.id !== itemId);
    await AsyncStorage.setItem(key, JSON.stringify(filteredData)); 
}; 

export const clearData = async (key=DEFAULT_KEY_NAME) => { 
    await AsyncStorage.removeItem(key); 
};

export const getLogData = async (key=DEFAULT_KEY_NAME): Promise<string | null> => {
    try {
        const data = await AsyncStorage.getItem(key);
        if (!data) {
            return null;
        }
        return JSON.stringify(JSON.parse(data), null, 2);
    } catch (e) {
        console.error("Error retrieving log data: ", e);
        return null;
    }
}; 