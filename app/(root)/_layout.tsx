import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "../global.css";



export default function Layout() {

    return (

        <Stack >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="find-ride" options={{ headerShown: false }} />
            <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
            <Stack.Screen name="book-ride" options={{ headerShown: false }} />
            <Stack.Screen name="fund" options={{ headerShown: false }} />
        </Stack>


    );
}
