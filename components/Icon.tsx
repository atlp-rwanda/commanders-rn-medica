import { Image, PressableProps, TouchableOpacity } from "react-native";

const icons = {
  back: require("@/assets/icons/back.png"),
  chat: require("@/assets/icons/chat.png"),
  message: require("@/assets/icons/message.png"),
  lock: require("@/assets/icons/lock.png"),
  hide: require("@/assets/icons/hide.png"),
};

const sizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

type IconSet = typeof icons;

export type IconName = keyof IconSet;

type IconProps = {
  name: IconName;
  size?: keyof typeof sizes;
  onPress?: () => void;
};

export function Icon(props: IconProps & PressableProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image
        source={icons[props.name]}
        style={{
          objectFit: "contain",
          width: sizes[props.size ?? "md"],
          height: sizes[props.size ?? "md"],
        }}
      />
    </TouchableOpacity>
  );
}
