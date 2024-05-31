import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import {
  btnStyle as commonBtnStyle,
  textStyle as commonTextStyle,
} from "../../styles/common";

interface Props {
  title: string;
  onPress?: TouchableOpacityProps["onPress"];
  backgroundColor?: string;
}

const PlayButton: React.FC<Props> = ({ title, onPress, backgroundColor }) => {
  return (
    <Pressable
      style={[commonBtnStyle, { backgroundColor, borderRadius: 30, flexDirection: "row" }]}
      onPress={onPress}
      >
          <Image source={require("../../assets/doctors/play.png")} />
      <Text
        style={{ color: "white", fontFamily: "UrbanistBold", fontSize: 16, marginLeft: 16 }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default PlayButton;
