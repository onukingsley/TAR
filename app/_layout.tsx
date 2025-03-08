import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import "./global.css";
import * as Location from "expo-location"
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import {tokenCache} from "../lib/auth";
import {Simulate} from "react-dom/test-utils";
import axiosClient from "./axios";
import {locationStore, Tokenstore, userDetails} from "../store";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';




// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loadUser, setLoadUser] = useState(true)
  const [loadUserLoc, setLoadUserLoc] = useState(true)
  const [hasPermission, setHasPermission] = useState(false)
  const [loadToken, setLoadToken] = useState(false)
  const {user,setUser} = userDetails()
  const {setUserLocation} = locationStore()
  const {setBalance,setTotalTar} = Tokenstore()

  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(()=>{

    const getloc = async ()=>{
      const {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted"){
        setHasPermission(false)
        return;
      }
      setLoadUserLoc(true)
      setHasPermission(true)
      const locatecoods = await Location.getCurrentPositionAsync()

      const address = await Location.reverseGeocodeAsync({
        longitude:locatecoods.coords.longitude,
        latitude: locatecoods.coords.latitude
      })

      const longitude  = locatecoods.coords.longitude
      const latitude  = locatecoods.coords.latitude

      setLoadUserLoc(false)
console.log(address[0])
      setUserLocation({latitude:latitude,longitude:longitude,address:`${address[0].name},${address[0].city}`})




    }
    getloc()
    axiosClient.get('/v1/user')
        .then(async ({data})=>{
            console.log(data)
          setUser({data:data})
            setLoadToken(true)
            axiosClient.get(`v1/users?id[eq]=${data.id}&TarToken=true`)
              .then(({data})=>{

                    setBalance(data.data[0].TarToken[0].balance)
                    setTotalTar(data.data[0].TarToken[0].totalTar)
                  setLoadToken(false)
                //console.log('this data to get balance',data.data[0].TarToken[0])

              }).catch(e=>setLoadToken(false))
              .finally(()=> {
                  setLoadToken(false)
              })

        }).catch(e=>console.log(e))
        .finally(()=>{
          setLoadUser(false)
        })
  },[])


  useEffect(() => {
    if (loaded && !loadUser && !loadToken ) {
      SplashScreen.hideAsync();
    }
  }, [loaded,loadUser,loadToken,loadUserLoc,]);

  if (!loaded) {
    return null;
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
        throw new Error(
            'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
        )
  }



    return (
      /*the application is wrapped with Clerk provider similar to Stripe in react where you wrap an element with publishable key*/
      <ClerkProvider publishableKey={publishableKey}  >
          <ClerkLoaded>
            <GestureHandlerRootView>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(root)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </GestureHandlerRootView>


          </ClerkLoaded>
      </ClerkProvider>

  );
}
