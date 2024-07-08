import { TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { supabase } from "@/app/supabase";
import { chatIcon } from "@/assets/icons/chat";
import { sendIcon } from "@/assets/icons/send";

interface Props {
  onPress: () => void;
}

export const SendMessageButton: React.FC<Props> = ({ onPress }) => {
  return (
    <View className="relative ml-3 bottom-1">
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-blue-500 p-4 rounded-full"
        onPress={onPress}
      >
        <SvgXml className="text-white" xml={sendIcon} width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};
