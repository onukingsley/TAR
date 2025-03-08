
import {Image, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {icons, images} from "../../constants";
import InputField from "../../components/InputField";
import {useState} from "react";
import Payment from "../../components/Payment";
import TestPayment from "../../components/TestPayment";
import {Tokenstore} from "../../store";


export default function Fund() {

const {balance} = Tokenstore()
    const fund = ()=>{

    }

  return (
      <View className="flex-1 bg-white">
            <View className=" relative w-full h-[250px]">
                <Image source={images.signUpCar} className="w-full z-0 h-[250px]"/>
                <Text className="text-2xl  text-black font-JakartaSemiBold absolute bottom-5 left-5 ">
                    Fund Tar
                </Text>

            </View>
            <View className="pt-3">



                <TestPayment paymentType={'fund'} location={'home'}/>
            </View>
    </View>
  );
}

