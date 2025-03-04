<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Ramsey\Uuid\Type\Integer;
use Stripe\PaymentIntent;
use Stripe\PaymentMethod;
use Stripe\Stripe;

class StripeController extends Controller
{
    public function createPaymentIntent(Request $request){
        Stripe::setApiKey(env('STRIPE_SECRET'));
        try {
            $existingCustomer = \Stripe\Customer::all(['email'=>$request->email]);

            if (count($existingCustomer->data)>0){
                $customer = $existingCustomer->data[0];
            }else{
                $customer = \Stripe\Customer::create([
                    'name' => $request->name,
                    'email' => $request->email
                ]);
            }


            $ephemeralKey = \Stripe\EphemeralKey::create([
                'customer' => $customer->id
            ],[
                'stripe_version' => '2022-11-15'
            ]);


            $paymentIntent = PaymentIntent::create([
                'amount' => 100 * 100,
                'currency' => 'usd',
                'customer' => $customer->id,
                'automatic_payment_methods' => [
                    'enabled' => true,
                    'allow_redirects'=> 'never'
                ],
            ]);


            return response()->json([
                'paymentIntent' => $paymentIntent,
                'ephemeralKey' => $ephemeralKey,
                'customer' => $customer->id
            ],200);
        }catch (\Exception $e){
            return response()->json([
                'error' => $e->getMessage(),
            ],500);
        }
    }
    public function confirmPayment(Request $request){
        Stripe::setApiKey(env('STRIPE_SECRET'));
        try {
            // Retrieve the PaymentMethod
            $paymentMethod = PaymentMethod::retrieve($request->paymentMethod);

            // Attach the PaymentMethod to the Customer
            $paymentMethod->attach([
                'customer' => $request->customer_id,
            ]);

            // Retrieve the PaymentIntent
            $paymentIntent = PaymentIntent::retrieve($request->payment_intent_id);

            // Confirm the PaymentIntent with the specified PaymentMethod
            $result = $paymentIntent->confirm([
                'payment_method' => $paymentMethod->id, // Use ->id for PHP
            ]);
            if ($result->status == "succeeded"){
                return response()->json([
                    "status" => $result->status,
                    "result" => $result,
                    "code" => '200'
                ],200);
            }else {
                return response()->json([
                    'status' => $result->status,
                    "code" => '200',
                    'result' => $result
                ],200);
            }
        }catch (\Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                "code" => '501'
            ],501);
        }


    }
}
