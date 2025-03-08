
import {Alert, Image, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import CustomButton from "./CustomButton";
import {icons, images} from "../constants";
import {confirmPayment, PaymentSheetError, useStripe} from '@stripe/stripe-react-native'
import {useEffect, useState} from "react";
import axiosClient from "../app/axios";
import {userDetails} from "../store";
import {ReactNativeModal} from "react-native-modal";
import {Stripe} from 'stripe'





export default function Payment({amount}) {

    const { initPaymentSheet, presentPaymentSheet, openPlatformPaySetup } = useStripe();
    const [success, setSuccess] = useState(false)
    const {user} = userDetails()
    const stripe = useStripe()



    const initializePaymentSheet = async () => {
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            intentConfiguration: {
                mode: {
                    amount: amount,
                    currencyCode: 'USD',
                },
                confirmHandler:  async (paymentMethod, shouldSavePaymentMethod, intentCreationCallback) => {
                    // Make a request to your own server.
                    const payload = {
                        'name' : user.name,
                        'email': user.email,
                        'amount': amount,
                        'paymentMethod':paymentMethod.id
                    }
                    axiosClient.post('/v1/stripe',payload)
                        .then(async ({data})=>{
                            console.log(data.customer)
                            console.log(data.paymentIntent.id)
                            console.log(paymentMethod.Card)
                            if (data.paymentIntent.client_secret){
                                const paylo = {
                                    'customer_id' : data.customer,
                                    'payment_intent_id' : data.paymentIntent.id,
                                    'paymentMethod' : paymentMethod.id
                                }
                                axiosClient.post('/v1/pay', paylo)
                                    .then(({data})=>{
                                        Alert.alert('payment', data.status)
                                        if (data.status == 'succeeded'){
                                            setSuccess(true)
                                        }
                                        intentCreationCallback({clientSecret : data.result.client_secret})
                                    }).catch((error)=>{
                                    console.log(error.message)
                                })
                                /*  intentCreationCallback({clientSecret : data.paymentIntent.client_secret})
                                 */
                            }
                        }).catch((error)=>{
                        console.log(error.message)
                        intentCreationCallback({error: error.message});
                    })


                    /* const response = await fetch(`${API_URL}/create-intent`, {
                         method: 'POST',
                         headers: {
                             'Content-Type': 'application/json',
                         }});
                     // Call the `intentCreationCallback` with your server response's client secret or error
                     const { client_secret, error } = await response.json();
                     if (client_secret) {
                         intentCreationCallback({clientSecret: client_secret});
                     } else {
                         intentCreationCallback({error});
                     }*/
                }

            },
            returnURL: 'myapp://book-ride'

        });
        if (error) {
            Alert.alert('error',error.message)
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    const openPayment = async ()=>{
        /*console.log((await presentPaymentSheet()).paymentOption)*/
        const { error } = await presentPaymentSheet();


        if (error) {
            Alert.alert("Payment Error",error.message)
            console.log(error.code)

        } else {
            Alert.alert("Success",'Payment Completed Successfully')
        }
    }

    /*
        //confirmHandler
        const confirmHandler = async (paymentMethod, shouldSavePaymentMethod, intentCreationCallback) => {
            // Make a request to your own server.
            const payload = {
                'name' : user.name,
                'email': user.email,
                'amount': amount,
                'paymentMethod':paymentMethod.id
            }
            axiosClient.post('/v1/stripe',payload)
                .then(({data})=>{
                    console.log(data)
                    if (data.paymentIntent.client_secret){
                        const payload = {
                            'customer_id' : data.customer_id,
                            'payment_intent_id' : data.paymentIntent.id,
                            'paymentMethod' : paymentMethod
                        }
                        axiosClient.post('/v1/pay', payload)
                            .then(({data})=>{
                                Alert.alert('payment', data.status)
                                intentCreationCallback({clientSecret : data.result.client_secret})
                            })
                        intentCreationCallback({clientSecret : data.paymentIntent.client_secret})
                    }
                })


           /!* const response = await fetch(`${API_URL}/create-intent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }});
            // Call the `intentCreationCallback` with your server response's client secret or error
            const { client_secret, error } = await response.json();
            if (client_secret) {
                intentCreationCallback({clientSecret: client_secret});
            } else {
                intentCreationCallback({error});
            }*!/
        }
    */

    return (
        <View className="pt-3">
            <ReactNativeModal isVisible={success} onBackdropPress={()=>setSuccess(false)} >
                <View className= "flex flex-col bg-white justify-center rounded-2xl">
                    <Image source={images.check} className="w-28 h-28 mt-5"/>
                    <Text className="text-2xl text-center font-JakartaBold mt-5">
                        Ride Booked
                    </Text>
                    <Text className='text-lg font-Jakarta text-center'>
                        Thank you for patronizing us, your ride will soon be here
                    </Text>
                </View>
            </ReactNativeModal>


            <CustomButton onPress={openPayment} title={'Pay'} IconRight={()=>{return <Image source={icons.checkmark} className='w-6 h-6' resizeMode="contain"/>}} />
        </View>

    );
}