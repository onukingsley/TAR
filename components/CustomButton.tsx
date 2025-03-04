
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {ButtonProps} from "../types/type";

const getBgVariantStyle = (variant: ButtonProps['bgVariant'])=>{
     switch (variant){
         case "secondary":
                return "bg-gray-500";
             case "danger":
                return "bg-red-500";
             case "outline":
                return "bg-transparent border-neutral-300 border-[0.5px]";
             case "success":
                return "bg-green-500";
         default:
             return "bg-[#0286ff]"
     }
}
const getTextVariantStyle = (variant: ButtonProps['textVariant'])=>{
    switch (variant){
        case "primary":
            return "text-black";
        case "danger":
            return "bg-red-500";
        case "secondary":
            return "text-gray-100";
        case "success":
            return "text-green-100";
        default:
            return "text-white"
    }
}

export default function CustomButton({onPress,textRef,reference,title,bgVariant="primary",textVarient="default",IconLeft,IconRight,className,...props}:ButtonProps) {

  return (
    <TouchableOpacity ref={reference} onPress={onPress} className={`p-3 rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`} {...props}>
        {IconLeft && <IconLeft/>}
        <Text  ref={textRef} className={`text-lg font-bold ${getTextVariantStyle(textVarient)}`}>{title}</Text>
        {IconRight && <IconRight/>}
    </TouchableOpacity>
  );
}

