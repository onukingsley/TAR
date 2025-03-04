import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosClient = axios.create({
    baseURL: 'http://192.168.115.223:8000/api',
    withCredentials: true,
})



axiosClient.interceptors.request.use(async(config)=>{
    if (await AsyncStorage.getItem('ACCESS_TOKEN')){
        const token = await AsyncStorage.getItem('ACCESS_TOKEN')

        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

axiosClient.interceptors.response.use((response)=>{
    return response
},(error)=>{
    try {
        const {response}= error
        console.log(error)
       /* if (response?.status === 401){
            AsyncStorage.removeItem("ACCESS_TOKEN")
        }*/
    }catch (e) {
        console.log(e)
        console.log(error)
    }
    throw error;

})

export default axiosClient;