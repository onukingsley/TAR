import {Text, View, Image} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import MapView, {MapPolyline, Marker, Polyline, PROVIDER_DEFAULT} from "react-native-maps";
import {locationStore, useDriverStore} from "../store";
import {calculateRegion, generateMarkersFromData} from "../lib/map";
import {icons} from "../constants";
import {useEffect, useState} from "react";
import {MarkerData} from "../types/type";
import axiosClient from "../app/axios";

 const drivers = [
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
]
export default function Map() {

    const {userLatitude, userLongitude, destinationLongitude, destinationLatitude} = locationStore()
    const {selectedDriver, setDrivers,drivers} = useDriverStore()



    const [markers, setMarkers] = useState([])
    const [coordinate, setCoordinate] = useState([])



    const region = calculateRegion({
        userLongitude,
        userLatitude,
        destinationLongitude,
        destinationLatitude,
    })
    useEffect(()=>{
        if (userLongitude && userLatitude && destinationLatitude && destinationLongitude){
            console.log( `${destinationLongitude},${destinationLatitude}|${userLongitude},${userLatitude}`)
            axiosClient.get('https://api.geoapify.com/v1/routing',{
                params:{
                    waypoints: `${userLongitude},${userLatitude}|${destinationLongitude},${destinationLatitude}`,
                    apiKey : '3b451faf1bed407ebf6e64ce7926b1c5',
                    mode: "drive"
                }
            }).then(({ data }) => {
                console.log('this is the data gotten',data.features[0].properties.distance)
               // console.log(data.features[0].geometry.coordinates[0])
                if (data.features && data.features.length > 0) {
                    const route = data.features[0].geometry?.coordinates[0];

                    const formattedCoordinate = route.map(([lng,lat])=>{
                        return {
                            latitude : lat, longitude : lng
                        }
                    })
                    setCoordinate(formattedCoordinate)
                    //console.log('this is the formattedcoordinate',formattedCoordinate)


                    /*  const formattedCoordinates = route.flat().map(([lng, lat]) => ({
                          latitude: lat,
                          longitude: lng,
                      }));

      */

                    /*const formattedCoordinates = route.flatMap((segment) =>
                        segment.map(([lng, lat]) => ({ latitude: lat, longitude: lng }))
                    );*/
                    /* setCoordinate(formattedCoordinates);*/
                    //console.log("this is the Route Coordinates:", coordinate);
                } else {
                    console.log("No route data found!");
                    setCoordinate([]); // Set empty array to avoid null issues
                }
            })
                .catch((error)=>{
                    console.log('this is the error '+ error)
                })
            /* const waypoints = `${userLatitude},${userLongitude} |${destinationLatitude},${destinationLongitude}`
             axiosClient.get(`https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=3b451faf1bed407ebf6e64ce7926b1c5`)
                 .then(({data})=>{
                     console.log(data)
                 })*/
        }

    },[userLongitude, userLatitude, destinationLongitude, destinationLatitude])



        const testCoordinates = [
            {latitude: 7.513619, longitude: 6.472696},
            {latitude: 7.513518, longitude: 6.472798},
            {latitude: 7.511754, longitude: 6.474643},
            {latitude: 7.511667, longitude: 6.474734}
    ];

    useEffect(() => {
        if (Array.isArray(drivers)) {
            if (!userLongitude || !userLatitude) {
                return;
            }

            const newMarkers = generateMarkersFromData({
                data: drivers,
                userLatitude: userLatitude,
                userLongitude: userLongitude,
            })
            setMarkers(newMarkers)
        }


    }, [drivers])


    return (
        <MapView
            provider={PROVIDER_DEFAULT}
            style={{width: '100%', height: '100%', borderRadius: '1rem'}}
            tintColor="black"
            mapType="standard"
            showsPointsOfInterest={false}
            initialRegion={region}
            showsUserLocation={true}
            userInterfaceStyle="dark"
            followsUserLocation={true}
        >
            <Polyline
            coordinates={testCoordinates} // Make sure it has {latitude, longitude}
            strokeColor="red"
            strokeWidth={3}
            key={JSON.stringify(coordinate)}
            lineDashPattern={[5, 5]} // Helps visibility

        />
            {drivers && drivers.map((markers) => {
                return <Marker coordinate={{
                    longitude: markers.longitude,
                    latitude: markers.latitude,
                }}
                     key={markers.id}
                     title={markers.title}
                     image={
                            selectedDriver == markers.id ? icons.selectedMarker : icons.marker
                     }
                />
            })}

            {userLatitude && userLongitude && (
            <Marker coordinate={{longitude: userLongitude,latitude:userLatitude}}
                image={icons.pin}
                    title={"Your current location"}

            />  )}
            {destinationLongitude && destinationLatitude && (
                <Marker coordinate={{longitude: destinationLongitude,latitude:destinationLatitude}}
                        image={icons.pin}
                        title={"your Destination Address"}

                />
            )}




        </MapView>
    );
}

