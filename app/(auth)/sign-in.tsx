import {Text, View, ScrollView, Image, StatusBar, Alert} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {icons, images} from "../../constants";
import InputField from "../../components/InputField";
import {useRef, useState} from "react";
import CustomButton from "../../components/CustomButton";
import {Link, router} from "expo-router";
import OAuth from "../../components/OAuth";
import axiosClient from "../axios";
import {ReactNativeModal} from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {black} from "nativewind/dist/metro/picocolors";
import {userDetails} from "../../store";


export default function SignIn() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const usernameRef = useRef(null)
    const buttonRef = useRef(null)
    const textRef = useRef(null)


    //If we were to use UseState hook to handle fetching the value from the form
        const [form, setform] = useState({email:"", password:""})
        const [modal, setModal] = useState(false)

        const {user, setUser} = userDetails()


    const onSignInPress = () => {
        //Disables and changes the color of the button to avoid multiple press
        buttonRef.current.setNativeProps({disabled:true,style:{backgroundColor:'gray'}})
        textRef.current.setNativeProps({style:{innerText:'Loading'}})

        axiosClient.post('/v1/authenticate',{'email':form.email,'password':form.password})
            .then(async ({data})=>{

                // Stores the token generated in a local storage(AsyncStorage) and user in the global User Store
                console.log(data)
                await AsyncStorage.setItem("ACCESS_TOKEN",data.token)
                setUser({data: data?.user})
                setModal(true)
            })
            .catch(e=>Alert.alert("Error","Invalid Log In Credentials"))
            .finally(()=>{
                //when the request is done, it returns both the bgcolor and the text of the button to default
                buttonRef.current.setNativeProps({disabled:false,style:{backgroundColor:'#0286ff'}})
                textRef.current.setNativeProps({style:{innerText :'Sign In'}})
            })
    }

    return (

        <ScrollView className="flex-1 bg-white ">
            <View className="flex-1 bg-white">
                <View className=" relative w-full h-[250px]">
                    <Image source={images.signUpCar} className="w-full z-0 h-[250px]"/>
                    <Text className="text-2xl  text-black font-JakartaSemiBold absolute bottom-5 left-5 ">
                        Welcome to Tar
                    </Text>

                </View>
                <View className="p-5 ">


                    <InputField
                        label="Email"
                        value={form.email}
                        onChangeText={(data)=>{setform({...form, email: data})}}
                        placeholder="Enter a Valid Email Address"
                        icon={icons.email}
                    />
                    <InputField
                        label="Password"
                        onChangeText={(password)=>{return setform({...form,password: password})}}
                        value={form.password}
                        placeholder="Enter a Strong Password"
                        icon={icons.lock}
                        /*secureTextEntry={true}*/
                    />

                    <CustomButton reference={buttonRef} textRef={textRef} className="mt-6" title="sign In" onPress={onSignInPress}/>
                    <OAuth/>
                    <Link className="mt-6 text-center" href={'/sign-up'}>
                        <Text>Don't have an account? </Text>
                        <Text className="text-primary-500">Sign Up</Text>
                    </Link>
                    <ReactNativeModal  isVisible={modal} onBackdropPress={()=>{setModal(false)}}>
                        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                            <Image
                            source={images.check}
                            className="w-[110px] h-[110px] mx-auto my-5"
                            />
                            <Text className="text-3xl font-JakartaBold text-center">
                                Verified
                            </Text>
                            <Text className="text-base text-gray-400 text-center font-Jakarta">
                                Account Verified Successfully
                            </Text>
                            <CustomButton title={"Home"} onPress={()=>{
                                setModal(false)
                                return router.replace('/(root)/(tabs)/home')
                            }}/>
                        </View>
                    </ReactNativeModal>

                </View>

            </View>
        </ScrollView>


    );
}

