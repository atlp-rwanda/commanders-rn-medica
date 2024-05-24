import { AntDesign } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";

interface BackIconProps {
  imageSource: any;
  onPress?: () => void;
}

const BackIcon = ({ imageSource, onPress }: BackIconProps) => {
  return (
    <View style={{ width: "100%", rowGap: 24 }}>
      <View style={{ alignItems: "flex-start" }}>
        <TouchableOpacity onPress={onPress}>
          <AntDesign name="arrowleft" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center"}}>
        <Image source={imageSource} className="w-40 h-40" />
      </View>
    </View>
  );
};

export default BackIcon;
