
import {Redirect} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";
import {useEffect, useState} from "react";
import axiosClient from "./axios";
import {View, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {userDetails} from "../store";



export default function index() {

  const {user} = userDetails()




  if (user) {
    console.log(user)
    return <Redirect href={'/(root)/(tabs)/home'} />
  }


if ( !user){
  return <Redirect href={'/welcome'} />
}


}

