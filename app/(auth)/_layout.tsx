import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "../global.css";



export default function Layout() {

    return (

        <Stack >
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack>


    );
}
