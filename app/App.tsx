import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import "./global.css"

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className={"text-green-500"}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


