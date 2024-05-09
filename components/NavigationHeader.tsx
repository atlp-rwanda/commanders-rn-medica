import { Icon } from "@/components/Icon";
import { Text } from "@/components/ThemedText";
import { router } from "expo-router";
import { View } from "react-native";

type NavigationHeaderProps = {
  title: string;
  onBack?: () => void;
};

export function NavigationHeader({ title, onBack }: NavigationHeaderProps) {
  const back = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <View className="flex-row items-center py-5">
      <Icon name="back" size="md" onPress={onBack ?? back} />
      <Text className="font-bold text-xl ml-3">{title}</Text>
    </View>
  );
}
