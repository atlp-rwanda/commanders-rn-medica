import { Text as DefaultText, TextProps } from "react-native";

export function Text({ style, className, ...props }: TextProps) {
  return (
    <DefaultText
      className={className + " text-base"}
      style={[{ fontFamily: "UrbanistRegular" }, style]}
      {...props}
    />
  );
}
