import {create} from "zustand"
import {Driver, DriverStore, LocationStore, MarkerData, User, UserDetails} from "../types/type";

export  const  userDetails = create((set)=>{
    return {
        user:null,
        setUser:({data})=>{
            set(()=>(
                {user: {...data}}
            ))

        },
        emptyUser:()=>{
            set(()=>{
               return {user:null}
            })
        },

    }
})

export const locationStore = create<LocationStore>((set)=>{
    return{
        userLongitude:null,
        userLatitude:null,
        userAddress:null,
        destinationAddress:null,
        destinationLatitude:null,
        destinationLongitude:null,
        setUserLocation:({longitude,latitude,address})=>{
           return set(()=>{
                return {userLongitude:longitude,userLatitude:latitude,userAddress:address}
            })
        },
       setDestinationLocation:({longitude, latitude, address})=>{
        return set(()=>{
            return {destinationLatitude:latitude,destinationLongitude:longitude,destinationAddress:address}
        })
       }
    }
})

export const useDriverStore = create<DriverStore>((set)=>{
    return {
        drivers: [] as MarkerData[],
        selectedDriver: null,
        setSelectedDriver: (driverId)=>{
            set(()=>( {selectedDriver:driverId}))
        },
        setDrivers: (drivers:MarkerData[])=>{
            set(()=>{
                return {
                    drivers:drivers
                }
            })
        },
        clearSelectedDriver:()=>{
            set(()=>{
                return {selectedDriver:null}
            })
        }
    }



})
export const rideStore = create((set)=>{
    return {
        price: null,
        setPrice: (price)=>{
            set(()=>{
                return {price:price}
            })
        },
        time: null,
        setTime: (time)=>{
            set(()=>{
                return {time:time}
            })
        },
        selectedDrive: null,
        setSelectedDrive: (driver)=>{
            return set(()=>{
                return {selectedDrive:driver}
            })
        },
        distance: null,
        setDistance: (distance)=>{
            set(()=>{
                return {price:distance}
            })
        },
        clearSelectedDrive:()=>{
            set(()=>{
                return {selectedDrive:null}
            })
        },
        clearStore:()=>{
            set(()=>{
                return {distance:null,price:null,selectedDrive:null}
            })
        }
    }
})