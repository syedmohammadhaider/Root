import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";
import { themes } from "../theme";
import Text from "./Text";


type HeaderProps = {
    title: string; 
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
}

export default function Header({ title, leftButton, rightButton }: HeaderProps) {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();  
    return (
        <SafeAreaView
            style={{
                width: '100%',
                justifyContent: 'space-between', 
                alignItems: 'center', 
                flexDirection: 'row',
                paddingHorizontal: 15, 
                paddingTop: (insets.top > 0) ? 0 : 20,
                paddingBottom: 20, 
                backgroundColor: theme.background,
            }}
        >
            {leftButton || <View style={{ width: 24 }} />}
            <Text
                weight='bold'
                style={{
                    fontSize: themes.fonts.sizes.heading,
                }}
            >
                {title}
            </Text>
            {rightButton || <View style={{ width: 24 }} />}
        </SafeAreaView>
    )
}