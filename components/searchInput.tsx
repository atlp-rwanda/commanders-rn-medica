import React, { ReactNode } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { filter } from "../assets/icons/filter";
import { search } from "../assets/icons/search";
import { useTranslation } from "react-i18next";

interface Props {
  value?: string;
  onChangeText?: (text: string) => void;
  backIcon?: ReactNode;
}

export const SearchInput: React.FC<Props> = ({ value, onChangeText, backIcon }) => {
  const { t } = useTranslation();
  return (
    <View className="mt-6">
      {backIcon && backIcon}
      <View
        className={`bg-whiteSmoke w-full flex-row justify-between items-center p-3 rounded-2xl`}
      >
        <TouchableOpacity activeOpacity={0.8} className="mr-3">
          <SvgXml xml={search} />
        </TouchableOpacity>
        <TextInput
          value={value}
          placeholder={t("home.searchPlaceholder")}
          placeholderTextColor="#BDBDBD"
          onChangeText={onChangeText}
          defaultValue={""}
          returnKeyType="search"
          className="font-['UrbanistRegular'] font-[14px] items-center bg-transparent flex-1 rounded-xl pr-2.5"
        />
        <TouchableOpacity activeOpacity={0.8} className="ms-3">
          <SvgXml xml={filter} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
