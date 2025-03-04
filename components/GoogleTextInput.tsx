import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {GoogleInputProps} from "../types/type";
import InputField from "./InputField";
import axiosClient from "../app/axios";
import {useState} from "react";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker'
import {locationStore} from "../store";


export default function GoogleTextInput({icon,initialLocation, containerStyle, textInputBackgroundColor, handlePress}:GoogleInputProps) {

    const [query, setQuery] = useState<string>(null)
    const [open, setOpen] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const [items, setItems] = useState([])



    const findPlace = async(text)=>{
        text = `${text} nigeria`
        if (text.length < 3)return
        try {
             axiosClient.get('https://api.geoapify.com/v1/geocode/autocomplete',{
                params:{
                     text:text,
                    apiKey: process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY,
                }

            }).then(({data})=>{
                 const places = data.features.map((place)=>{
                     return {
                         label: place.properties?.formatted,
                         value: place.properties?.formatted,
                         longitude:place.properties?.lon,
                         latitude:place.properties?.lat,
                         fullData: place,
                      }
                 })

                 setSuggestions(places)
                 setItems(places)
                 setOpen(true)
             })
                 .catch(e=>console.log(e))


        }
        catch (e){
            console.log(e)
        }


    }


    const SuggestionCard = ({item})=>{
        return <TouchableOpacity onPress={()=>{handlePress({latitude:item.latitude,longitude:item.longitude,address:item.value});setQuery(item.value);setSuggestions(null)}}>
            <View className='w-full bg-white my-2 shadow-neutral-500 shadow-md py-3'>
                <Text>{item.value}</Text>
            </View>
        </TouchableOpacity>
    }


  return (
    <View className={` w-full flex relative items-center px-5 justify-center  z-50 rounded-xl mb-5 ${containerStyle}`}>
      <InputField icon={!query? icon : null} placeholder={initialLocation? initialLocation:"Where do you want to go?" } className='w-[100%]' value={query} onChangeText={(text)=>{ setQuery(text);setTimeout(()=>{findPlace(text)},900)}}/>


            {suggestions && query && <FlatList
                data={items}
                renderItem={({item})=> <SuggestionCard item={item} />}
                style={{
                    backgroundColor: 'white',
                    position: 'relative',
                    top:0,
                    width: "100%",
                    borderRadius: 10,
                    zIndex: 99
                }}
                contentContainerStyle={{
                    backgroundColor: 'white',
                }}



            />}







{/*        {visible && <DropDownPicker placeholder={null}
                                    showArrow={false}  value={query} items={items} open={open} setOpen={setOpen}  setValue={(callback)=>{
            const value = callback(query)
            setQuery(value);
            setVisibility(false)
            setOpen(false);
            const selectedPlace = suggestions.find((s)=> s.value === value)
            if (selectedPlace){

            }
        }
        }

        />}*/}

    </View>
  );
}

