
import {Text,Image, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {icons} from "../constants";
import {router} from "expo-router";
import Map from "./Map";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import {useRef} from "react";


export default function RideLayout({children,title,snapPoints}) {

    const bottomSheetRef= useRef<BottomSheet>()

  return (
    <GestureHandlerRootView>
      <View className='flex-1 bg-white'>
          <View className='flex flex-col bg-blue-500 h-screen'>
              <View className='flex flex-row absolute z-10 top-10 items-center justify-start px-5'>
                <TouchableOpacity onPress={()=>router.back()}>
                    <View className='h-10 w-10 bg-white flex justify-center items-center rounded-full'>
                        <Image
                            source={icons.backArrow}
                            resizeMode='contain'
                            className='w-6 h-6'
                        />
                    </View>
                </TouchableOpacity>
                  <Text className='text-xl font-JakartaBold ml-4' >{title || "Go Back "}</Text>
              </View>
              <Map/>

          </View>
          <BottomSheet keyboardBehavior={'extend'} ref={bottomSheetRef} snapPoints={snapPoints||["40%","85%"]} index={0}>
              <BottomSheetView style={{flex: 1, padding:20}}>
                  {children}
              </BottomSheetView>
          </BottomSheet>

      </View>


    </GestureHandlerRootView>
  );
}

