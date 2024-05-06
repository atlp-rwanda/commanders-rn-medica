import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "./Icon";

type NavigationHeaderProps = {
  title: string;
  onBack?: () => void;
};

export function NavigationHeader({ title, onBack }: NavigationHeaderProps) {
  const back = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <View style={styles.container}>
      <Icon name="back" size="md" onPress={onBack ?? back} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212121"
  },
});
