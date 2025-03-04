import {Text, View, ScrollView, Image, StatusBar, Button, TextInput, Alert} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {icons, images} from "../../constants";
import InputField from "../../components/InputField";
import {useRef, useState} from "react";
import CustomButton from "../../components/CustomButton";
import {Link} from "expo-router";
import OAuth from "../../components/OAuth";
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import {ReactNativeModal} from "react-native-modal";
import axiosClient from "../axios"
import AsyncStorage from "@react-native-async-storage/async-storage";




export default function signUp() {
  /*
    //this code is an alternative for using the usestate hook to fetch data from input
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()
*/

    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [pendingVerification, setPendingVerification] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [verification, setVerification] = useState({
        state:'default',error:'', code: ''
    })
    const [code, setCode] = useState('')


    //this is in a case where you would use useState hook to fetch the input data from the form
    const [form, setform] = useState({name: "", email:"", password:""})

    const email = form.email
    const password =form.password


    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
                await signUp.create({
                    emailAddress:form.email,
                    password:form.password
                })


            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setPendingVerification(true)
            setVerification({...verification,state: "pending"})
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
            Alert.alert(err.errors[0].code,err.errors[0].message)
        }
    }

    // used the function below to test my axios client on localhost
    const testaxios = ()=>{
        axiosClient.get('/v1/users')
            .then(({data})=>{
                console.log(data)
                Alert.alert("Test","Registered successfully")
            }).catch(e=>console.log(e))
    }


    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification

                const signUpAttempt = await signUp.attemptEmailAddressVerification({
                    code: verification.code,
                })



            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                //adding user to the database and authenticating using laravel
                axiosClient.post('/v1/register',{'email':form.email,'password':form.password,'name':form.name})
                    .then(async ({data})=>{
                        console.log(data)
                        await AsyncStorage.setItem("ACCESS_TOKEN",data.token)
                        /*router.replace('/index')*/
                    }).catch(e=>console.log(e))

                await setActive({ session: signUpAttempt.createdSessionId })
                setVerification({...verification,state: 'success'})

            } else {
                setVerification({...verification,state: "failed",error: "Verification Failed"})
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {

            setVerification({...verification,state: "failed",error: `Verification Failed ${err.errors[0].longMessage}`})
            console.error(JSON.stringify(err, null, 2))
        }
    }


    return (

        <ScrollView className="flex-1 bg-white ">
            <View className="flex-1 bg-white">
                <View className=" relative w-full h-[250px]">
                    <Image source={images.signUpCar} className="w-full z-0 h-[250px]"/>
                    <Text className="text-2xl  text-black font-JakartaSemiBold absolute bottom-5 left-5 ">
                        Create Your Account
                    </Text>

                </View>
                <View className="p-5 ">

                    <InputField
                        label="Name"
                        onChangeText={(name)=>{return setform({...form,name: name})}}
                        value={form.name}
                        placeholder="Enter Your Name"
                        icon={icons.person}
                    />
                    <InputField
                        label="Email"
                        onChangeText={(email)=>{return setform({...form,email: email})}}
                        value={form.email}
                        placeholder="Enter a Valid Email Address"
                        icon={icons.email}
                    />
                    <InputField
                        label="Password"
                        onChangeText={(password)=>{return setform({...form,password: password})}}
                        value={form.password}
                        placeholder="Enter a Strong Password"
                        icon={icons.lock}
                    />

                    <CustomButton className="mt-6" title="sign Up" onPress={onSignUpPress}/>
                    <OAuth/>
                    <Link className="mt-6 text-center" href={'/sign-in'}>
                        <Text>Already have an account? </Text>
                        <Text className="text-primary-500">Log In</Text>
                    </Link>


                </View>

                <ReactNativeModal onModalHide={()=>{if(verification.state=='success'){setShowModal(true)}}} onBackdropPress={()=>{return setVerification({...verification,state: "ok"})}} isVisible={verification.state==="pending"}>
              <View className="bg-white px-7 py-9 rounded-2xl h-[300px] ">
                  <Text className="text-2xl font-JakartaExtraBold mb-2">Verification</Text>
                  <Text className="font-Jakarta mb-5">We've sent a verification code to {email}</Text>
                  <InputField label={"Code"} placeholder={'12345'} icon={icons.lock} value={verification.code} onChangeText={(code)=>setVerification({...verification,code: code})} keyboardType="numeric"/>

                  <CustomButton className={'mt-3'} title={'Verify Email'} bgVariant={"success"} onPress={onVerifyPress}/>

              </View>
                </ReactNativeModal>

                <ReactNativeModal onBackdropPress={()=>{return setVerification({...verification,state: "ok"})}} isVisible={showModal}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image
                        source={images.check}
                        className = "w-[110px] h-[110px] mx-auto my-5"
                        />
                        <Text className="text-3xl font-JakartaBold text-center">
                            Verified
                        </Text>
                        <Text className="text-base text-gray-400 text-center font-Jakarta">
                            Account Verified Successfully
                        </Text>
                        <CustomButton title={"Home"} onPress={()=>{
                            setShowModal(false)
                            return router.replace('/(root)/(tabs)/home')
                        }}/>
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>


    );
}

