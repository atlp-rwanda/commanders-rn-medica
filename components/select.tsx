import { downFilledArrowIcon } from "@/assets/icons/arrow";
import React from "react";
import { View } from "react-native";
import { SelectList, SelectListProps } from "react-native-dropdown-select-list";
import { SvgXml } from "react-native-svg";

type SelectProps = SelectListProps & {
  icon?: React.ReactNode;
};

export function Select({ fontFamily, search, ...props }: SelectProps) {
  return (
    <View className="relative w-100 items-center flex-row">
      {props.icon && (
        <View className="absolute z-10 top-0 h-14 items-center justify-center px-3">
          {props.icon}
        </View>
      )}
      <View className="relative top-0 left-0 w-full">
        <SelectList
          {...props}
          fontFamily={fontFamily || "UrbanistRegular"}
          search={search || false}
          arrowicon={
            <SvgXml
              xml={downFilledArrowIcon}
              className="text-gray-800"
              width={20}
              height={20}
            />
          }
          inputStyles={{
            fontSize: 16,
            lineHeight: 24,
            marginLeft: props.icon ? 24 : 0,
          }}
          boxStyles={{
            backgroundColor: "#FAFAFA",
            borderColor: "transparent",
            paddingVertical: 16,
          }}
          dropdownStyles={{
            backgroundColor: "#FAFAFA",
            borderColor: "transparent",
          }}
          dropdownTextStyles={{
            fontSize: 16,
            lineHeight: 24,
          }}
        />
      </View>
    </View>
  );
}
