
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {Tabs} from "expo-router";
import '../../global.css'
import {icons} from "../../../constants";

export default function Layout() {

    const TabIcon = ({source, focused}:{source:ImageSourcePropType, focused:boolean})=>{
        return <View className={`flex flex-row w-12 h-12 justify-center items-center rounded-full ${focused? 'bg-general-300': ''}`}>
            <View className={`rounded-full w-12 h-12 items-center justify-center ${focused? 'bg-general-400':''}`}>
                <Image source={source} tintColor='white' resizeMode={"cover"} className={'w-7 h-7'} />
            </View>
        </View>
    }

  return (
    <Tabs initialRouteName="home" screenOptions={{
        tabBarActiveTintColor:'white',
        tabBarInactiveTintColor:'white',
        tabBarShowLabel:false,
        tabBarHideOnKeyboard:true,
        tabBarStyle:{
            backgroundColor: "#333333",
            borderRadius: 50,
            paddingBottom: 30,
            overflow: "hidden",
            marginHorizontal: 20,
            marginBottom: '3%',
            height:'10%',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            flexDirection: 'row',
            position:'absolute'
        }}}>

        <Tabs.Screen name="home" options={{
            title:"Home",
            tabBarIcon: ({focused})=> <TabIcon focused={focused} source={icons.home}/>,
            headerShown:false
        }}/>


        <Tabs.Screen name="rides" options={{
            title:"Rides",
            tabBarIcon: ({focused})=> <TabIcon focused={focused} source={icons.list}/>,
            headerShown:false
        }}/>


        <Tabs.Screen name="chat" options={{
            title:"Chat",
            tabBarIcon: ({focused})=> <TabIcon focused={focused} source={icons.chat}/>,
            headerShown:false
        }}/>


        <Tabs.Screen name="profile" options={{
            title:"profile",
            tabBarIcon: ({focused})=> <TabIcon focused={focused} source={icons.profile}/>,
            headerShown:false
        }}/>

    </Tabs>
  );
}

