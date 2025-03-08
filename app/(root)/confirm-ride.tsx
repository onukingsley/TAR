
import {Text, View, FlatList, Alert} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import RideLayout from "../../components/RideLayout";
import DriverCard from "../../components/DriverCard";
import CustomButton from "../../components/CustomButton";
import {router} from "expo-router";
import {locationStore, rideStore, useDriverStore, userDetails} from "../../store";
import {useEffect, useState} from "react";
import {generateMarkersFromData} from "../../lib/map";
import {driverTime} from "../../lib/driver";
import axiosClient from "../axios";


/*const drivers = [
    {
        "id": "1",
        "first_name": "James",
        "last_name": "Wilson",
        "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
        "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
        "car_seats": 4,
        "rating": "4.80"
    },
    {
        "id": "2",
        "first_name": "David",
        "last_name": "Brown",
        "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
        "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
        "car_seats": 5,
        "rating": "4.60"
    },
    {
        "id": "3",
        "first_name": "Michael",
        "last_name": "Johnson",
        "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
        "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
        "car_seats": 4,
        "rating": "4.70"
    },
    {
        "id": "4",
        "first_name": "Robert",
        "last_name": "Green",
        "profile_image_url": "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
        "car_image_url": "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
        "car_seats": 4,
        "rating": "4.90"
    }
]*/


export default function ConfirmRide() {
    const [markers, setMarkers] = useState([])
    const {selectedDriver,setSelectedDriver,setDrivers,drivers} = useDriverStore()
    const {setTime,setPrice,setDistance,setSelectedDrive} = rideStore()
    const {userLatitude,userLongitude,destinationLongitude,destinationLatitude} = locationStore()

    const [loadDriver, setLoadDriver] = useState(false)

    useEffect( () => {
        const fetchDrivers = async ()=>{
            setLoadDriver(true)
            axiosClient.get('/v1/drivers?user=true')
                .then(({data})=>{



                    // console.log(data.data)
                    if (Array.isArray(data.data)) {
                        if (!userLongitude || !userLatitude) {
                            return;
                        }



                        const newMarkers = generateMarkersFromData({
                            data: data.data,
                            userLatitude: userLatitude,
                            userLongitude: userLongitude,
                        })
                        //   console.log('this is the new Marker',newMarkers)

                        const ma = driverTime({markers: newMarkers,
                            userLatitude: userLatitude,
                            userLongitude: userLongitude,
                            destinationLongitude:destinationLongitude,
                            destinationLatitude:destinationLatitude})



                        const  getData = async ()=>{
                            const m = await ma
                            console.log(' distance',m.userToDestination.distance)
                            console.log(' price',m.userToDestination.price)
                            setDrivers(m.updatedMarkers)
                            setPrice(m.userToDestination.price)
                            setDistance(m.userToDestination.distance)
                            setTime(m.userToDestination.time)
                            setLoadDriver(false)

                        }
                        getData()

                    }

                }).catch(e=> {
                Alert.alert('Info', 'Unavailable Drivers, Please Try again shortly')
                setLoadDriver(false)
            })
         //   const {data} = await axiosClient('/v1/drivers?user=true')


        }
        fetchDrivers()



    }, [])


    return (
    <RideLayout title='Find' snapPoints={['65%' , '85%']}>
      <FlatList data={drivers}
                renderItem={({item})=><DriverCard setSelected={()=> {
                    setSelectedDriver(item.id); setSelectedDrive(item)
                }} selected={selectedDriver!}  item={item}/>}
                ListEmptyComponent={()=>{return loadDriver ? <Text className='font-JakartaSemiBold text-lg text-neutral-500,mb-5'>Please wait locating drivers nearby...</Text>: (<Text className='font-JakartaSemiBold text-lg text-neutral-500,mb-5'>No Nearby Ride Found</Text>)}}
                ListFooterComponent={()=><CustomButton title={'Select Ride'} onPress={()=>router.push('/(root)/book-ride')}/>}
      />
    </RideLayout>
  );
}

