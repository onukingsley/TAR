
import {Alert, Image, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "./CustomButton";
import {icons, images} from "../constants";
import {confirmPayment, PaymentSheetError, useStripe} from '@stripe/stripe-react-native'
import {useEffect, useRef, useState} from "react";
import axiosClient from "../app/axios";
import {Tokenstore, userDetails} from "../store";
import {ReactNativeModal} from "react-native-modal";
import {Stripe} from 'stripe'
import {Simulate} from "react-dom/test-utils";
import InputField from "./InputField";
import {router} from "expo-router";






export default function TestPayment({location,paymentType}) {


    const {setTotalTar,setBalance,balance,totalTar} =  Tokenstore()
    const { initPaymentSheet, presentPaymentSheet, openPlatformPaySetup } = useStripe();
    const [success, setSuccess] = useState(false)
    const {user} = userDetails()
    const stripe = useStripe()
    const [dataready, setDataReady] = useState(false)
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true)
    const [amount, setAmount] = useState(null)
    const [transactionId, setTransactionId] = useState(null)
    const confirmRef = useRef(null);

const fetchdata = async ()=>{
    const payload = {
        'name' : user.name,
        'email': user.email,
        'amount': amount,

    }
        const {data} = await axiosClient.post('/v1/stripe',payload)
    return(data)

}

    const initializePaymentSheet = async () => {
        setLoading(true)
        const payload = {
            'name' : user.name,
            'email': user.email,
            'amount': amount,

        }
       await axiosClient.post('/v1/stripe',payload)
           .then(async ({data})=>{
               console.log(data)
               setTransactionId(data.paymentIntent?.id)
               const { error } = await initPaymentSheet({
                   merchantDisplayName: "Example, Inc.",
                   customerId: data.customer,
                   customerEphemeralKeySecret: data.ephemeralKey.secret,
                   paymentIntentClientSecret: data.paymentIntent.client_secret,




               });


               if (error) {
                   Alert.alert('error Message',error.message)
                   router.back()
               }else {
                   setLoading(false)
                   confirmRef.current.setNativeProps({disabled:false,style:{backgroundColor:'#0286ff'}})
               }
           }).catch(e=>console.log(e))




    };

    useEffect(() => {
        initializePaymentSheet();

    }, [dataready]);

    const openPayment = async ()=>{
        const { error } = await presentPaymentSheet();


        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
            router.back()
        } else {
            Alert.alert('Success', `You purchased ${amount/10} Tar Tokens` );

               if (paymentType == 'fund'){
                   const payload = {
                       'transactionId' : transactionId,
                       'user_id' : user.id,
                       'tarToken' : amount/10,
                       'amount' : amount
                   }
                   console.log(payload)
                   axiosClient.post('/v1/tarPayments',payload)
                       .then(({data})=>{
                           console.log('this is the datad',data.balance)
                           //update the token balance from store
                           setBalance(data.balance)
                           setTotalTar(data.totalTar)
                           router.back()
                           //router.replace(`/${location}`)
                       }).catch(e=>console.log(e))


               }

        }
    }



    return (
        <View className="pt-3">

            <ReactNativeModal  onBackdropPress={()=>{setVisible(false); router.back()}} isVisible={visible}>
                <View className="bg-white px-7 py-9 rounded-2xl h-[300px] ">
                    <Text className="text-2xl font-JakartaExtraBold mb-2">Fund</Text>
                    <Text className="font-Jakarta mb-5">Enter Amount</Text>
                    <InputField
                        label="Amount"
                        value={amount}
                        keyboardType={"numeric"}
                        onChangeText={(data)=>{setAmount(data)}}
                        icon={icons.dollar}
                    />
                    <CustomButton  className={'mt-3'} title={'confirm'} bgVariant={"success"} onPress={()=>{if (!amount){Alert.alert('Info','Amount is required'); router.back()} ; confirmRef.current.setNativeProps({disabled:true,style:{backgroundColor:'gray'}});
                         setDataReady(true);setVisible(false)}}/>

                </View>
            </ReactNativeModal>

           <View className='mb-5'>
               {loading && (<Text className='font-JakartaSemiBold text-lg mb-5'>
                   Please wait while we process your payment....
               </Text>)}
               {!loading && (<Text className='font-JakartaSemiBold text-lg mb-5'>
                   Payment Process Completed, Proceed to Pay
               </Text>)}
           </View>


            <CustomButton reference={confirmRef} onPress={()=>{setDataReady(true); openPayment()}} title={`Pay $${amount}`} IconRight={()=>{return <Image source={icons.checkmark} className='w-6 h-6' resizeMode="contain"/>}} />
        </View>

    );
}