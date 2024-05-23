import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React, { ReactNode } from "react";

interface Props extends TouchableOpacityProps {
  children: ReactNode;
}

const Touchable: React.FC<Props> = ({ children, ...restProps }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} {...restProps}>
      {children}
    </TouchableOpacity>
  );
};

export default Touchable;
