import { Icon, IconName } from "@/components/Icon";
import { NavigationHeader } from "@/components/NavigationHeader";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type ContactMethod = "sms" | "email";

export default function ForgotPasswordScreen() {
  const [selected, setSelected] = useState<ContactMethod>("sms");

  return (
    <View style={styles.container}>
      <NavigationHeader title="Forgot Password" />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <KeyboardAvoidingView>
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
              subtitle="+1 111 ******99"
              selected={selected === "sms"}
              onPress={() => setSelected("sms")}
            />
            <SelectContactMethod
              icon="message"
              title="via Email"
              subtitle="and***ley@yourdomain.com"
              selected={selected === "email"}
              onPress={() => setSelected("email")}
            />
          </View>
          <TouchableOpacity
            className="bg-primary-500 p-4 my-5 rounded-full shadow-sm shadow-primary-500"
            onPress={() => {
              router.push("/reset-password/verify-code");
            }}
          >
            <Text className="text-white text-center font-bold">Continue</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const SelectContactMethod = ({
  icon,
  title,
  subtitle,
  selected,
  onPress,
}: {
  icon: IconName;
  title: string;
  subtitle: string;
  selected: boolean;
  onPress?: () => void;
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
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
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
