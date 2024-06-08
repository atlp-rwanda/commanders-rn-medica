import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { TabsIcons } from "../../assets/icons";
import { supabase } from "../supabase";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const { data: user } = await supabase.auth.getSession();
        setAuthenticated(!!user); 
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    }

    checkAuthentication();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (authenticated) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); 
  }, [authenticated]);

  return authenticated ? ( 
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerShown: false,
        tabBarStyle: {
          borderTopColor: "#FFFFFF",
          shadowColor: Platform.select({ android: "#FFFFFF" }),
          paddingBottom: Platform.select({ android: 20, ios: 30 }),
          minHeight: 68,
        },
        tabBarLabelStyle: {
          fontFamily: "UrbanistMedium",
        },
        tabBarHideOnKeyboard: true,
      }}
      sceneContainerStyle={{ backgroundColor: "#FFFFFF" }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <SvgXml xml={TabsIcons[focused ? "filled" : "outlined"]["Home"]} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          title: "Appointment",
          tabBarIcon: ({ focused }) => (
            <SvgXml
              xml={TabsIcons[focused ? "filled" : "outlined"]["Appointment"]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <SvgXml
              xml={TabsIcons[focused ? "filled" : "outlined"]["History"]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="articles"
        options={{
          title: "Articles",
          tabBarIcon: ({ focused }) => (
            <SvgXml
              xml={TabsIcons[focused ? "filled" : "outlined"]["Articles"]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <SvgXml
              xml={TabsIcons[focused ? "filled" : "outlined"]["Profile"]}
            />
          ),
        }}
      />
    </Tabs>
  ) : null;
}
