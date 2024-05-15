import { View } from "react-native";
import { Text } from "./ThemedText";

type RadioProps = {
  label?: string;
  selected?: boolean;
  onPress?: () => void;
};

export const Radio = (props: RadioProps) => {
  return (
    <View className="flex-row items-center">
      <View className="w-6 h-6 border-2 border-primary-500 rounded-[120px] mr-3 items-center justify-center">
        {props.selected && (
          <View className="w-4 h-4 bg-primary-500 rounded-[120px]" />
        )}
      </View>
      <Text className="text-lg font-UrbanistRegular">{props.label}</Text>
    </View>
  );
};
