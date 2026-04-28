import { setStatusBarStyle } from 'expo-status-bar';
import { createContext, ReactNode, useContext, useState } from "react";
import { useColorScheme } from "react-native";
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

    const toggleTheme = () => {
        setIsDark(!isDark); 
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