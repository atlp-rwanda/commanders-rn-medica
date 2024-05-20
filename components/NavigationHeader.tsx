import { Icon } from "@/components/Icon";
import { Text } from "@/components/ThemedText";
import { router } from "expo-router";
import { View } from "react-native";

type NavigationHeaderProps = {
  title: string;
  onBack?: () => void;
  children?: React.ReactNode;
};

export function NavigationHeader({
  title,
  onBack,
  children,
}: NavigationHeaderProps) {
  const back = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <View className="flex-row items-center py-5">
      <Icon name="back" size="md" onPress={onBack ?? back} />
      <Text className="font-UrbanistBold text-2xl ml-4 flex-1">{title}</Text>
      {children}
    </View>
  );
}
