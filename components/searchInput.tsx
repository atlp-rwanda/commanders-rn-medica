import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { search } from "../assets/icons/search";
import { filter } from "../assets/icons/filter";

interface Props {
  value?: string;
  onChangeText?: (text: string) => void;
}

export const SearchInput: React.FC<Props> = ({ value, onChangeText }) => (
  <View style={{ marginTop: 24 }}>
    <View
      style={{
        backgroundColor: "#F5F5F5",
        // height: 50,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderRadius: 16,
      }}
    >
      <TouchableOpacity activeOpacity={0.8} style={{ marginEnd: 12 }}>
        <SvgXml xml={search} />
      </TouchableOpacity>
      <TextInput
        value={value}
        placeholder={"Search"}
        placeholderTextColor="#BDBDBD"
        onChangeText={onChangeText}
        defaultValue={""}
        returnKeyType="search"
        style={{
          color: "#130F26",
          alignItems: "center",
          backgroundColor: "transparent",
          flex: 1,
          paddingRight: 10,
          borderRadius: 12,
        }}
      />
      <TouchableOpacity activeOpacity={0.8} style={{ marginStart: 12 }}>
        <SvgXml xml={filter} />
      </TouchableOpacity>
    </View>
  </View>
);
