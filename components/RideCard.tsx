
import { Text, View, Image } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {icons} from "../constants";
import {formatDate,formatTime} from "../lib/utils";


export default function RideCard({ride}) {
  return (
    <SafeAreaView className='flex flex-row items-center justify-center m-3 shadow-sm shadow-neutral-300 rounded-lg bg-white ' >
      <View className='flex flex-col items-center justify-between p-3 bg-white m-2'>
          <View className='flex flex-row items-center justify-between rounded-2xl  border-[1px] border-neutral-300'>
              <Image
              source={{uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`}}
              className='w-[80px] h-[90px] border-[2px] rounded-lg border-purple-600'
              />
              <View className='flex flex-col  mx-5 gap-y-4 flex-1 justify-center'>
                <View className=' flex flex-row items-center gap-x-2 '>
                    <Image
                    source={icons.to}
                    className="h-5 w-5 mx-1"
                    />
                    <Text className='text-neutral-700 text-md font-JakartaSemiBold'>{ride.destination_address}</Text>
                </View>
                  <View className=' flex flex-row items-center justify-start'>
                      <Image
                          source={icons.point}
                          className="h-5 w-5 mx-1"
                      />
                      <Text className='text-neutral-700 text-md font-JakartaSemiBold'>{ride.origin_address}</Text>
                  </View>

              </View>
          </View>

          <View className="flex flex-col bg-general-500 rounded-lg mt-5 p-3 w-full gap-y-5">
              <View className="flex flex-row items-center w-full justify-between mb-5">
                  <Text className="font-JakartaSemiBold text-lg text-neutral-500 text-left"> Date & Time</Text>
                  <Text className="font-JakartaBold text-lg text-right"> {formatDate(ride.created_at)},{formatTime(ride.ride_time)}</Text>
              </View>
              <View className="flex flex-row items-center w-full justify-between mb-5">
                  <Text className="font-JakartaSemiBold text-lg text-neutral-500 text-left"> Driver</Text>
                  <Text className="font-JakartaBold text-lg text-right"> {ride.driver.first_name},{ride.driver.last_name}</Text>
              </View>
              <View className="flex flex-row items-center w-full justify-between mb-5">
                  <Text className="font-JakartaSemiBold text-lg text-neutral-500 text-left"> Car Seats</Text>
                  <Text className="font-JakartaBold text-lg text-right"> {ride.driver.car_seats}</Text>
              </View>
              <View className="flex flex-row items-center w-full justify-between mb-5">
                  <Text className="font-JakartaSemiBold text-lg text-neutral-500 text-left"> Payment Status</Text>
                  <Text className={`font-JakartaBold text-lg capitalize ${ride.payment_status=='paid'? "text-green-500":"text-red-500"} text-right`}> {ride.payment_status}</Text>
              </View>
          </View>
      </View>

    </SafeAreaView>
  );
}

