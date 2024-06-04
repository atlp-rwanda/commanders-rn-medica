import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Modal, TouchableWithoutFeedback, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { search } from "../assets/icons/search";
import { focus } from "../assets/icons/focus";
import { filter } from "../assets/icons/filter";


interface Props {
  value?: string;
  onChangeText?: (text: string) => void;
}

export const SearchInput: React.FC<Props> = ({ value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);
 
  

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
 
  return (
    <View className="mt-2">
      <View className="flex-row  justify-between  items-center w-full p-3  ml-[3px] rounded-[16px] border-[1px]"
        style={{
          borderColor: isFocused ? "#246BFD" : "#F5F5F5",
          backgroundColor: isFocused ? "rgba(36, 107, 253, 0.08)" : "#F5F5F5"
        }
      }
      >
        <View className="px-5">
          <SvgXml xml={isFocused ? focus : search} />
        </View>
        <TextInput
          value={value}
          placeholder="Search"
          placeholderTextColor="#BDBDBD"
          onChangeText={onChangeText}
          returnKeyType="search"
          className="flex-1 text-[14px] font-UrbanistRegular bg-[transparent] rounded-[28px] pr-[10px] "
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: 10 }}>
          <SvgXml xml={filter} />
        </TouchableOpacity>
       
               
      </View>
    </View>
  );
};
