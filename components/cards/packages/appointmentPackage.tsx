import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import Touchable from "@/components/common/touchable";
import { SvgXml } from "react-native-svg";

interface Props {
  key: string;
  title: string;
  description: string;
  price: string;
  icon: ReactNode;
}
const AppointmentPkg: React.FC<Props> = ({
  title,
  description,
  price,
  icon,
}) => {
  return (
    <View
      className="bg-white p-5 rounded-3xl flex-row justify-between"
      style={{
        shadowColor: "rgba(4, 6, 15, 0.5)",
        shadowRadius: 10,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 10,
      }}
    >
      {icon && (
        <Touchable
          disabled
          className="w-[60px] h-[60px] bg-[#246BFD14] items-center justify-center rounded-full"
        >
          <SvgXml
            xml={icon.toString()}
            width={28}
            height={28}
            className="text-primary-500"
          />
        </Touchable>
      )}
      <View className="w-4/5 h-max items-center justify-around">
        <View className="flex-row w-full justify-between items-center">
          <Text className="text-[16px] font-UrbanistBold text-greyscale-900">
            {title}
          </Text>
          <Text className="text-[18px] font-UrbanistBold text-primary-500">
            {price}
          </Text>
        </View>
        <View className="flex-row w-full justify-between items-center">
          <Text className="text-[12px] font-UrbanistMedium text-greyscale-700">
            {description}
          </Text>
          <Text className="text-[10px] font-UrbanistMedium text-greyscale-700">
            (paid)
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AppointmentPkg;
