import { Text as DefaultText, TextProps } from "react-native";

export function Text({ style, ...props }: TextProps) {
  return (
    <DefaultText
      style={[{ fontFamily: "UrbanistRegular" }, style]}
      {...props}
    />
  );
}
