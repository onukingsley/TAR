
import {
    KeyboardAvoidingView,
    Text,
    TouchableWithoutFeedback,
    View,
    Image,
    TextInput,
    Keyboard,
    Platform
} from 'react-native';
import {useState} from "react";

import Toast from 'react-native-simple-toast';
import {InputFieldProps} from "../types/type";

export default function InputField ({label,labelStyle, reference, placeholder, icon, secureTextEntry = false, containerStyle, inputStyle, iconStyle, ...props}:InputFieldProps) {

    const [isfocused, setIsfocused] = useState(false)


  return (
   <KeyboardAvoidingView  behavior={Platform.OS === "ios"? "padding": "height"}>
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="my-2 w-full">
                {label && <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
                    {label}
                </Text>}

                <View  className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border-neutral-100 ${isfocused? "border-primary-300 border-[0.5px]": ''} ${containerStyle}`}>
                    {icon && <Image source={icon} resizeMode={'contain'} className={`w-6 h-6 ml-4 ${iconStyle}`}/>}
                    <TextInput className={`w-full rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 text-left ${inputStyle}`}
                        secureTextEntry={secureTextEntry}
                        placeholder={placeholder}
                               {...props}
                        onFocus={()=>setIsfocused(true)}
                        onBlur={()=>setIsfocused(false)}
                    />


                </View>
            </View>
       </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
  );
}

