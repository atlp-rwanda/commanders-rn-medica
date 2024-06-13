import { calendar } from "@/assets/icons/userprofile/icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import {
  TextInput as DefaultTextInput,
  Pressable,
  StyleSheet,
  TextInputProps,
  View,
  TouchableOpacity
} from "react-native";
import { SvgXml } from "react-native-svg";
import { Icon } from "./Icon";
import { MaterialIcons } from "@expo/vector-icons";

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
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={[styles.passwordContainer, style]}>
      <Icon name="lock" />
      <DefaultTextInput
        style={styles.passwordInput}
        placeholder="Password"
        secureTextEntry={!isPasswordVisible}
        ref={(r) => setRef?.(r)}
        {...rest}
      />
   <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.iconContainer}
      >
        <MaterialIcons
          name={isPasswordVisible ? "visibility" : "visibility-off"}
          size={20}
          color="#9E9E9E"
        />
      </TouchableOpacity>
    </View>
  );
};

export const DateInput = ({ value, onChangeText, ...rest }: TextInputProps) => {
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState<'date'>('date')

  const showPicker = () => {
    setShow(true)
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    onChangeText?.(currentDate)
  };

  return (
    <View>
      <Pressable className="bg-[#FAFAFA] flex-row items-center rounded-lg w-full px-5" onPress={showPicker}>
        <DefaultTextInput
          editable={false}
          className="py-4 flex-1 text-base text-gray-600 font-UrbanistRegular"
          value={value}
          {...rest}
        />
        <SvgXml xml={calendar} />
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          onChange={onChange}
        />
      )}
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
  iconContainer: {
    marginLeft: 10,
  },
});
