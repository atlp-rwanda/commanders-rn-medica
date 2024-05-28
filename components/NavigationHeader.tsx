import { leftOutlinedArrowIcon } from "@/assets/icons/arrow";
import { Text } from "@/components/ThemedText";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

type NavigationHeaderProps = {
  title: string;
  onBack?: () => void;
  children?: React.ReactNode;
  iconClassName?: string;
};

export function NavigationHeader({
  title,
  onBack,
  children,
  iconClassName,
}: NavigationHeaderProps) {
  const back = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <View className="flex-row items-center py-5">
      <TouchableOpacity onPress={onBack ?? back}>
        <SvgXml
          xml={leftOutlinedArrowIcon}
          className={iconClassName ?? "text-black"}
          width={28}
          height={28}
        />
      </TouchableOpacity>
      <Text className="font-UrbanistBold text-2xl ml-4 flex-1">{title}</Text>
      {children}
    </View>
  );
}
