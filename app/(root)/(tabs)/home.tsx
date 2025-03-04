import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import {Link, router} from "expo-router";
import * as Location from "expo-location"
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View, Image} from 'react-native'
import CustomButton from "../../../components/CustomButton";
import axiosClient from "../../axios";
import RideCard from "../../../components/RideCard"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useRef, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {icons, images} from "../../../constants";
import GoogleTextInput from "../../../components/GoogleTextInput";
import Map from "../../../components/Map"
import {locationStore, userDetails} from "../../../store";

export default function Page() {

    const buttonRef = useRef(null)

    const [loading, setLoading] = useState(false)
    const [loadingLocation, setLoadingLocation] = useState(true)
    const [hasPermissions, setHasPermissions] = useState(false)


    const {user,setUser,emptyUser} = userDetails()
    const {setDestinationLocation,userAddress,setUserLocation,destinationAddress} = locationStore()
    console.log(userAddress)
    /*console.log('this:'+destinationAddress)*/

   /* useEffect(()=>{
         const requestLocation = async ()=>{
             let {status} = await Location.requestForegroundPermissionsAsync()

             /!*console.log(status)*!/
             if (status !== 'granted'){
                 setHasPermissions(false)
                 setLoadingLocation(false)
                 return;
             }
             let locate = await Location.getCurrentPositionAsync()
             if (locate.coords.longitude){
                 const address  = await Location.reverseGeocodeAsync({
                     latitude:locate.coords.latitude,
                     longitude:locate.coords.longitude
                 })
                 setUserLocation({
                     latitude: locate.coords.latitude,
                     longitude: locate.coords.longitude,
                     address: `${address[0].name},${address[0].formattedAddress}`
                 })
                 setLoadingLocation(false)
             }






         }

         requestLocation();
    },[])*/

    //this function gets the data from googleTextInput through the handle press property and sets the destination to the store
    const handleDestinationPress = (item)=>{

        //sets the destination location to the store
        setDestinationLocation({latitude:item.latitude,longitude:item.longitude,address:item.address})

        // navigates to the find-ride page
        router.push("/(root)/find-ride")

    }

    //this function handles User Logout
   const logout = async ()=>{
        //Disables and changes the background color of the button
        buttonRef.current.setNativeProps({disabled:true,style:{backgroundColor:'gray'}})
       axiosClient.post('/v1/logout')
           .then(async ({data})=>{
               console.log(data)

               //Remove the user from Zustand global state and token from asyncstorage
               await AsyncStorage.removeItem('ACCESS_TOKEN')
               emptyUser();
               //navigate to the welcome Screen
                 router.replace('/welcome')
           })
           .catch(e=>Alert.alert('Error',e))
           .finally(()=>{
               //returns the original state of the button
               buttonRef.current.setNativeProps({style:{backgroundColor:'#0286ff'}})
           })
   }

   const rides = [
       {
           "ride_id": "1",
           "origin_address": "Kathmandu, Nepal",
           "destination_address": "Pokhara, Nepal",
           "origin_latitude": "27.717245",
           "origin_longitude": "85.323961",
           "destination_latitude": "28.209583",
           "destination_longitude": "83.985567",
           "ride_time": 391,
           "fare_price": "19500.00",
           "payment_status": "pending",
           "driver_id": 2,
           "user_id": "1",
           "created_at": "2024-08-12 05:19:20.620007",
           "driver": {
               "driver_id": "2",
               "first_name": "David",
               "last_name": "Brown",
               "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
               "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
               "car_seats": 5,
               "rating": "4.60"
           }
       },
       {
           "ride_id": "2",
           "origin_address": "Jalkot, MH",
           "destination_address": "Pune, Maharashtra, India",
           "origin_latitude": "18.609116",
           "origin_longitude": "77.165873",
           "destination_latitude": "18.520430",
           "destination_longitude": "73.856744",
           "ride_time": 491,
           "fare_price": "24500.00",
           "payment_status": "paid",
           "driver_id": 1,
           "user_id": "1",
           "created_at": "2024-08-12 06:12:17.683046",
           "driver": {
               "driver_id": "1",
               "first_name": "James",
               "last_name": "Wilson",
               "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
               "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
               "car_seats": 4,
               "rating": "4.80"
           }
       },
       {
           "ride_id": "3",
           "origin_address": "Zagreb, Croatia",
           "destination_address": "Rijeka, Croatia",
           "origin_latitude": "45.815011",
           "origin_longitude": "15.981919",
           "destination_latitude": "45.327063",
           "destination_longitude": "14.442176",
           "ride_time": 124,
           "fare_price": "6200.00",
           "payment_status": "paid",
           "driver_id": 1,
           "user_id": "1",
           "created_at": "2024-08-12 08:49:01.809053",
           "driver": {
               "driver_id": "1",
               "first_name": "James",
               "last_name": "Wilson",
               "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
               "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
               "car_seats": 4,
               "rating": "4.80"
           }
       },
       {
           "ride_id": "4",
           "origin_address": "Okayama, Japan",
           "destination_address": "Osaka, Japan",
           "origin_latitude": "34.655531",
           "origin_longitude": "133.919795",
           "destination_latitude": "34.693725",
           "destination_longitude": "135.502254",
           "ride_time": 159,
           "fare_price": "7900.00",
           "payment_status": "paid",
           "driver_id": 3,
           "user_id": "1",
           "created_at": "2024-08-12 18:43:54.297838",
           "driver": {
               "driver_id": "3",
               "first_name": "Michael",
               "last_name": "Johnson",
               "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
               "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
               "car_seats": 4,
               "rating": "4.70"
           }
       }
   ]

/*
if (loadingLocation){
    return <SafeAreaView>
        <Text>
            Loading......
        </Text>
    </SafeAreaView>
}
*/

    return (
        <SafeAreaView>

            <FlatList
                data={rides}
                renderItem={({item})=><RideCard ride={item}/>}
                className="px-5 "
                keyboardShouldPersistTaps={"handled"}
                contentContainerStyle={{paddingBottom:'30%'}}
                ListEmptyComponent={()=>{
                    setLoading(false)
                    return <View className="flex flex-row justify-center items-center">
                        {!loading? (<View className='flex justify-center items-center'>
                                    <Image
                                        source={images.noResult}
                                        alt="No result found"
                                        resizeMode="contain"
                                        className="w-40 h-40"
                                    />
                                    <Text className='font-JakartaSemiBold capitalise text-2xl'>No Recent Rides Found</Text>

                                </View>
                            )
                        :
                            <View className='flex flex-col'>
                                <ActivityIndicator size={"large"} color={'primary-500'}/>
                                <Text className='font-JakartaSemiBold capitalise text-2xl'>Loading Rides</Text>
                            </View>


                        }

                    </View>
                }}
                ListHeaderComponent={()=>{
                return <>
                    <View className="flex flex-row items-center justify-between my-3">
                        <Text className='font-JakartaBold text-lg'>Welcome User</Text>
                        <TouchableOpacity onPress={logout} className="flex flex-row gap-x-1 px-5 py-3 rounded-2xl bg-primary-400">
                            <Text>
                                Logout
                            </Text>
                            <Image
                                source={icons.out}
                                className='w-5 h-5'
                            />
                        </TouchableOpacity>
                    </View>

                    <GoogleTextInput
                    icon={icons.search}
                    containerStyle=" shadow-md shadow-neutral-300"
                    handlePress={handleDestinationPress}
                    />

                    <>
                        <Text className="font-JakartaBold text-xl mt-5 mb-3">
                            Your Current Location
                        </Text>
                        <View className="flex flex-row items-center bg-transparent h-[300px]">
                            <Map/>
                        </View>
                    </>
                    <Text className="font-JakartaBold text-xl mt-5 "> Recent Rides</Text>
                </>
                }}
            />



          <CustomButton reference={buttonRef} title={'logout'} bgVariant={"primary"} onPress={logout} />

        </SafeAreaView>
    )
}