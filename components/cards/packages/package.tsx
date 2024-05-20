import { Text } from "@/components/ThemedText";
import { Radio } from "@/components/radio";
import { TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

type PackageProps = {
  title: string;
  description: string;
  price: string;
  period: string;
  selected?: boolean;
  icon?: React.ReactNode;
  onPress?: () => void;
};

export function Package(props: PackageProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View className="flex-row bg-white items-center justify-between shadow shadow-gray-100 rounded-xl px-2 py-5 mb-4">
        <View className="flex-row items-center">
          {props.icon && (
            <View className="p-4 bg-primary-50 rounded-full">
              <SvgXml xml={props.icon.toString()} width={28} height={28} className="text-primary-500" />
            </View>
          )}
          <View className="ml-4">
            <Text className="text-lg font-UrbanistBold mb-1">{props.title}</Text>
            <Text className="text-sm text-gray-500">{props.description}</Text>
          </View>
        </View>
        <View>
          <Text className="text-xl text-primary-500 font-UrbanistBold text-center">
            {props.price}
          </Text>
          <Text className="text-sm text-gray-500 ml-2 text-center">
            / {props.period}
          </Text>
        </View>
        <View>
          <Radio selected={props.selected} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
