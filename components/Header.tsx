import { leftOutlinedArrowIcon } from "@/assets/icons/arrow";
import { Text } from "@/components/ThemedText";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

type NavigationHeaderProps = {
  title: string;

  iconClassName?: string;
};

export function NavigationHeader({
  title,
  
  iconClassName,
}: NavigationHeaderProps) {
  return (
    <View className="flex-row items-center py-5">
      <TouchableOpacity >
        <SvgXml
          xml={leftOutlinedArrowIcon}
          className={iconClassName ?? "text-black"}
          width={28}
          height={28}
        />
      </TouchableOpacity>
      <Text className="font-UrbanistBold text-2xl ml-4 flex-1">{title}</Text>
    </View>
  );
}
