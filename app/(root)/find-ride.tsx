
import { Text, View, Image } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {locationStore} from "../../store";
import RideLayout from "../../components/RideLayout";
import GoogleTextInput from "../../components/GoogleTextInput";
import {icons} from "../../constants";
import CustomButton from "../../components/CustomButton";
import {router} from "expo-router";


export default function FindRide() {

    const {destinationAddress,destinationLongitude,destinationLatitude,setDestinationLocation,setUserLocation,userAddress } = locationStore()

    //set userLocation from googleTextInput
    const handlePress = (item)=>{
        return setUserLocation({latitude:item.latidude,longitude:item.longitude,address:item.address})
    }
    //set destinationLocation from googleTextInput
    const handleDestinationPress = (item)=>{
        return setDestinationLocation({latitude:item.latidude,longitude:item.longitude,address:item.address})
    }
    console.log(userAddress)
  return (
      <RideLayout title='Ride'>
          <SafeAreaView>
              <View>
                    <Text className='text-lg font-JakartaSemiBold mb-3'>From</Text>
                      <GoogleTextInput icon={icons.pin} initialLocation={userAddress} containerStyle='bg-neutral-100' textInputBackgroundColor={"#f5f5f5"} handlePress={handlePress}/>

              </View>
              <View>
                  <Text className='text-lg font-JakartaSemiBold mb-3'>To</Text>
                  <GoogleTextInput icon={icons.to} initialLocation={destinationAddress} containerStyle='bg-neutral-100' textInputBackgroundColor={"#f5f5f5"} handlePress={handleDestinationPress}/>

              </View>
                <CustomButton onPress={()=>{router.push("/(root)/confirm-ride")}} title={'Find Now'} className='gap-x-1' IconLeft={()=>{return <Image source={icons.search} className='h-6 w-6 ' />}} />


          </SafeAreaView>
      </RideLayout>

  );
}

