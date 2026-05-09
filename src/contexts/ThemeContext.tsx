import { setStatusBarStyle } from 'expo-status-bar';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { loadThemePreference, saveThemePreference } from '../services/storage';
import { themes } from "../theme";

export interface ThemeContextType {
    theme: typeof themes.lightColors;
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const deviceScheme = useColorScheme(); 
    const [ isDark, setIsDark ] = useState(deviceScheme === 'dark'); 

    useEffect(() => {
        const loadTheme = async () => {
            const preference = await (async () =>  loadThemePreference())(); 
            if (preference) {
                setIsDark(preference); 
                setStatusBarStyle(preference ? 'light' : 'dark', true); 
            }
        }
        loadTheme();
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark); 
        (async () => await saveThemePreference(!isDark))();
        setStatusBarStyle(!isDark ? 'light' : 'dark', true); 
    }
    const activeTheme = isDark ? themes.darkColors : themes.lightColors; 

    return (
        <ThemeContext.Provider value={{ theme: activeTheme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}; 

export const useTheme = () => useContext(ThemeContext);