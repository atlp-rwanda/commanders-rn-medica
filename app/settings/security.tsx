import React, { useState, useEffect } from "react";
import { View, ScrollView, FlatList, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { NavigationHeader } from "@/components/NavigationHeader";
import SecurityCard from "@/components/settings/securityCard";
import { router } from "expo-router";

interface Setting {
  id: number;
  title: string;
  value: boolean;
  auth?: boolean;
}

const defaultSettings: Setting[] = [
  { id: 5, title: "Remember me", value: false },
  { id: 1, title: "PIN", value: false },
  { id: 2, title: "Biometric", value: false },
];

const Security = () => {
  const insets = useSafeAreaInsets();
  const [settings, setSettings] = useState<Setting[]>(defaultSettings);
  const [isBiometricAvailable, setIsBiometricAvailable] =
    useState<boolean>(false);

  useEffect(() => {
    checkBiometricCompatibility();
    loadSettings();
  }, []);

  useEffect(() => {
    if (!areSettingsEqual(settings, defaultSettings)) {
      resetToDefault();
    }
  }, [settings]);

  const areSettingsEqual = (settings1: Setting[], settings2: Setting[]) => {
    if (settings1.length !== settings2.length) {
      return false;
    }
    return settings1.every((setting, index) => {
      const defaultSetting = settings2[index];
      return (
        setting.id === defaultSetting.id &&
        setting.title === defaultSetting.title 
      );
    });
  };

  const checkBiometricCompatibility = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAvailable(compatible);
    } catch (error) {
      console.error("Failed to check biometric compatibility", error);
    }
  };

  const loadSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem("securitySettings");
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error("Failed to load settings", error);
    }
  };

  const saveSettings = async (newSettings: Setting[]) => {
    try {
      await AsyncStorage.setItem(
        "securitySettings",
        JSON.stringify(newSettings)
      );
    } catch (error) {
      console.error("Failed to save settings", error);
    }
  };

  const resetToDefault = async () => {
    setSettings(defaultSettings);
    await saveSettings(defaultSettings);
  };

  const toggleSetting = async (id: number) => {
    const newSettings = settings.map((setting) =>
      setting.id === id ? { ...setting, value: !setting.value } : setting
    );
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "white" }}>
      <View style={{ paddingHorizontal: 16, marginTop: 32, paddingBottom: 16 }}>
        <NavigationHeader title={"Security"} onBack={router.back} />
      </View>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 16 }}>
        <FlatList
          data={settings}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <SecurityCard
              key={item.id.toString()}
              title={item.title}
              value={item.value}
              auth={item.auth}
              onPressToggle={() => toggleSetting(item.id)}
              isBiometric={isBiometricAvailable}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default Security;
