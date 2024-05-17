import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <View
        style={[
          styles.searchContainer,
          {
            borderColor: isFocused ? "#007AFF" : "#F5F5F5",
            backgroundColor: isFocused ? "rgba(36, 107, 253, 0.08)" : "#F5F5F5"
          },
        ]}
      >
        <View style={
          styles.icon}>
          <SvgXml xml={isFocused ? focus : search} />
        </View>
        <TextInput
          value={value}
          placeholder="Search"
          placeholderTextColor="#BDBDBD"
          onChangeText={onChangeText}
          returnKeyType="search"
          style={[styles.input, { color: isFocused ? "#000" : "#BDBDBD" }]}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TouchableOpacity activeOpacity={0.8} style={styles.icon}>
          <SvgXml xml={filter} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    width: 336,
    height: 56,
    padding: 3,
    borderRadius: 16,
    borderWidth: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Urbanist-Regular',
    backgroundColor: 'transparent',
    borderRadius: 28,
    paddingRight: 10,
  },
});
