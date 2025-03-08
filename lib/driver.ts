import {useEffect} from "react";
import axiosClient from "../app/axios";


export const driverTime = async ({markers, userLongitude, userLatitude, destinationLongitude, destinationLatitude})=>{
    function convertSecondsToMinutes(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes} min ${remainingSeconds} sec`;
    }

    const getUserToDestination = async ()=>{
        let distance,time,price
        //this is the distance from User to the destination
        await axiosClient.get('https://api.geoapify.com/v1/routing',{
            params: {
                waypoints : `${userLongitude},${userLatitude}|${destinationLongitude},${destinationLatitude}`,
                mode: 'drive',
                apiKey: process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY
            }
        }).then(async ({data})=>{
            distance = data.features[0].properties.distance
            time = data.features[0].properties.time

            distance = distance/1000
            time = convertSecondsToMinutes(time)
            price = distance*0.8;

        }).catch(error=>console.log(error))
        return { distance, time, price };
    }


    const calculateDriverTime = markers.map(async (marker) => {
        try {
            const { data } = await axiosClient.get('https://api.geoapify.com/v1/routing', {
                params: {
                    waypoints: `${marker.longitude},${marker.latitude}|${userLongitude},${userLatitude}`,
                    mode: 'drive',
                    apiKey: process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY
                }
            });

            const driveDistance = (data.features[0].properties.distance / 1000).toFixed(2); // Convert to km
            const driveTime = convertSecondsToMinutes(data.features[0].properties.time);

            return { ...marker, driveTime, driveDistance };
        } catch (error) {
            console.error(`Error fetching driver time for marker ${marker.id}:`, error);
            return { ...marker, driverTime: 'N/A', driverDistance: 'N/A' }; // Handle failure gracefully
        }
    });
    const userToDestination = await getUserToDestination();
    const updatedMarkers = await Promise.all(calculateDriverTime);

    return {
        userToDestination,
        updatedMarkers
    };

}