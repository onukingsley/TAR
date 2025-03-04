import {Image, Text, View} from 'react-native';
import CustomButton from "./CustomButton";
import {icons} from "../constants";


export default function () {

    const handleGoogleSignin = async ()=>{

    }
    return (
        <View>
            <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
                <View className="flex-1 h-[1px] bg-general-100"/>
                <Text className="JakartaSemiBold text-lg ">Or</Text>
                <View className="flex-1 h-[1px] bg-general-100"/>
            </View>
            <CustomButton title={"Log In with Google"}
                          bgVariant="outline"
                          textVarient="primary"
                          className="mt-5 w-full shadow-none"
                          onPress={handleGoogleSignin}
                          IconLeft={() => {
                              return <Image source={icons.google}
                              resizeMode="contain"
                              className="w-5 h-5 mx-2"
                              />
                          }
                          }
            />

        </View>
    );
}

