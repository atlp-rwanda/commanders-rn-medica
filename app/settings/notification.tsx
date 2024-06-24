import { View, Text, FlatList, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationHeader } from "@/components/NavigationHeader";
import { supabase } from "../supabase";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import NotifCard from "@/components/settings/notifCard";
import { router } from "expo-router";

interface Notification {
  id: number;
  title: string;
  order: number;
}

interface ActivatedNotification {
  notification_id: number;
  value: boolean;
}

const Notification = () => {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activatedNotifications, setActivatedNotifications] = useState<
    ActivatedNotification[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<Notifications.PermissionStatus | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await getNotificationPermissions(); 
      await fetchUser(); 
    };

    fetchData();
  }, []);

  const getNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
      setNotificationPermissionStatus(status);
    
     if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        alert('You need to enable notification permissions in settings');
      }
      setNotificationPermissionStatus(newStatus);
    }
  };

  const fetchUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUserId(data.user?.id || null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data: notificationsData, error: fetchError } = await supabase
        .from("notifications")
        .select("id, title, order")
        .order("order", { ascending: true });

      if (fetchError) {
        console.error("Error fetching notifications:", fetchError);
        setLoading(false);
        return;
      }

      setNotifications(notificationsData);

      if (userId) {
        const { data: activatedData, error: activatedError } = await supabase
          .from("activated_notifications")
          .select("notification_id, value")
          .eq("user_id", userId);

        if (activatedError) {
          console.error(
            "Error fetching activated notifications:",
            activatedError
          );
        } else {
          setActivatedNotifications(activatedData);
        }
      }

      setLoading(false);
    };

    fetchNotifications();
  }, [userId]);

  const updateNotification = async (
    notificationId: number,
    newValue: boolean
  ) => {
    if (!userId) return;

    const existingActivatedNotif = activatedNotifications.find(
      (notif) => notif.notification_id === notificationId
    );

    if (existingActivatedNotif) {
      const { data, error } = await supabase
        .from("activated_notifications")
        .update({ value: newValue })
        .eq("user_id", userId)
        .eq("notification_id", notificationId);

      if (error) {
        console.error("Error updating notification:", error);
      } else {
        setActivatedNotifications((prev) =>
          prev.map((notif) =>
            notif.notification_id === notificationId
              ? { ...notif, value: newValue }
              : notif
          )
        );
      }
    } else {
      const { data, error } = await supabase
        .from("activated_notifications")
        .insert({
          user_id: userId,
          notification_id: notificationId,
          value: newValue,
        });

      if (error) {
        console.error("Error activating notification:", error);
      } else {
        setActivatedNotifications((prev) => [
          ...prev,
          { notification_id: notificationId, value: newValue },
        ]);
      }
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: "white" }}>
      <View style={{ paddingHorizontal: 16, marginTop: 24, paddingBottom: 12 }}>
        <NavigationHeader title={"Notification"} onBack={() => router.back()} />
      </View>
      <FlatList
        data={notifications}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const activatedNotif = activatedNotifications.find(
            (notif) => notif.notification_id === item.id
          );
          const isActive = activatedNotif ? activatedNotif.value : false;

          return (
            <NotifCard
              title={item.title}
              value={isActive}
              updateValue={() => updateNotification(item.id, !isActive)}
            />
          );
        }}
      />
    </View>
  );
};

export default Notification;
