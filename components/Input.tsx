import {
  TextInput as DefaultTextInput,
  StyleSheet,
  TextInputProps,
  View,
} from "react-native";
import { Icon } from "./Icon";

export const TextInput = ({ ...rest }: TextInputProps) => {
  return (
    <DefaultTextInput
      className="px-5 py-4 bg-[#FAFAFA]  rounded-lg w-full text-base font-UrbanistRegular"
      {...rest}
    />
  );
};

type PasswordInputProps = {
  placeholder?: string;
  style?: object;
  setRef?: any;
} & TextInputProps;

export const PasswordInput = ({
  style,
  setRef,
  ...rest
}: PasswordInputProps) => {
  return (
    <View style={[styles.passwordContainer, style]}>
      <Icon name="lock" />
      <DefaultTextInput
        style={styles.passwordInput}
        placeholder="Password"
        secureTextEntry
        ref={(r) => setRef?.(r)}
        {...rest}
      />
      <Icon name="hide" />
    </View>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    minHeight: 60,
    maxHeight: 60,
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
  },
});
