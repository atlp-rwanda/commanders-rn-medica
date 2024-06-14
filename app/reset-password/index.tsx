import { Icon, IconName } from "@/components/Icon";
import { NavigationHeader } from "@/components/NavigationHeader";
import { router} from "expo-router";
import { useState, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  TextInput,
  ActivityIndicator,
  BackHandler
} from "react-native";
import { Text } from "@/components/ThemedText";
import { supabase } from "../supabase";
import { TouchableOpacity } from "react-native-gesture-handler";

type ContactMethod = "sms" | "email";

export default function ForgotPasswordScreen() {
  const [selected, setSelected] = useState<ContactMethod>("sms");
  const[email, setEmail]=useState("");
  const [phone, setPhone]= useState("");
  const [error, setError] = useState("");
  const[loading, setLoading]=useState(false);

  useEffect(() => {
    const backAction = () => {
      return true; 
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const handlePasswordReset = async () => {
    setLoading(true);
    if (selected === "email") {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setError("oops you forgot to provide a registered email")
    } else {
      Alert.alert("Success", "Reset otp has been sent to your email.");
      router.push({
        pathname: "reset-password/verify-code",
        params: { email, method: selected },
      });
    }
  }
  setLoading(false);
  };
 

  return (
 
    <View style={styles.container}>
      <NavigationHeader title="Forgot Password" />
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1"
        keyboardVerticalOffset={20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 mb-4"
        >
          <Image
            source={require("@/assets/images/forgot-password/frame.png")}
            style={styles.image}
          />
          <Text style={styles.subtitle}>
            Select which contact details should we use to reset your password
          </Text>
          <View>
            <SelectContactMethod
              icon="chat"
              title="via SMS"
              subtitle={phone}
              selected={selected === "sms"}
              onPress={() => setSelected("sms")}
              setContact={setPhone} 
            />
            <SelectContactMethod
              icon="message"
              title="via Email"
              subtitle={email}
              selected={selected === "email"}
              onPress={() => setSelected("email")}
              setContact={setEmail} 
            />
          </View>
          <Text className="text-[#913831] font-[UrbanistRegular] text-center text-[14px]">{error}</Text>
          <TouchableOpacity
            className="bg-lightblue p-4 my-5 rounded-full shadow-sm shadow-lightblue"
            onPress={handlePasswordReset}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-center font-bold">Continue</Text>
            )}
          </TouchableOpacity>
      
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
    
  );
}

const SelectContactMethod = ({
  icon,
  title,
  subtitle,
  selected,
  onPress,
  setContact
}: {
  icon: IconName;
  title: string;
  subtitle: string;
  selected: boolean;
  onPress?: () => void;
  setContact?: (contact: string) => void;
}) => {
  return (
    <Pressable
      style={[styles.card, selected && styles.selectedCard]}
      onPress={onPress}
    >
      <View style={styles.cardIcon}>
        <Icon name={icon} />
      </View>
      <View>
        <Text style={styles.cardTitle}>{[title]}</Text>
        {selected ? (
          <TextInput
            style={styles.cardSubtitle}
            placeholder="type here"
            value={subtitle}
            onChangeText={setContact}
          />
        ) : (
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 12,
  },
  image: {
    width: "100%",
    height: 250,
    objectFit: "contain",
    marginVertical: 28,
  },
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 24,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "#EEEEEE",
    marginBottom: 8,
  },
  selectedCard: {
    borderColor: "#5089FF",
  },
  cardIcon: {
    backgroundColor: "rgba(36, 107, 253, 0.08)",
    padding: 18,
    borderRadius: 36,
  },
  cardTitle: {
    opacity: 0.5,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontWeight: "bold",
  },
});
