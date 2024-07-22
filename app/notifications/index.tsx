import { Icon } from "@/components/Icon";
import { Text } from "@/components/ThemedText";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View
} from "react-native";
import NotificationComponent from "../../components/notifications/notification";
import { supabase } from "../supabase";
import { UIActivityIndicator } from "react-native-indicators";
export default function NotificationsScreen() {
  const [data, setData] = useState<any[]>([]);
  const [cancelled, setCancelled] = useState<any[]>([]);
  const [upcoming, setUpcoming]=useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const pickerRef = useRef<Picker<String>>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        const userId = userData?.user?.id;

        const { data: appointments, error: appError } = await supabase
          .from("appointment")
          .select("*, doctor(name)")
          .eq("patient_id", userId)
          .eq("notification", "TRUE").order("created_at", {ascending:false})
        if (appError) throw appError;
        setData(appointments);


        const { data: cancelledAppointments, error: cancelError } = await supabase
          .from("cancel-appointment")
          .select("*")
          .eq("patient_id", userId)
          .eq("notification", "TRUE").order("created_at", {ascending:false})
        if (cancelError) throw cancelError;
        setCancelled(cancelledAppointments);
        const now = new Date();
        const tenMinutesLater = new Date(now.getTime() + 30 * 60000).toISOString();
        const { data: upcomingAppointments, error: upcomingError } = await supabase
          .from("appointment")
          .select("*, doctor(name)")
          .eq("patient_id", userId)
          .eq("appointment_date", now.toISOString().split("T")[0])
          .lte("appointment_time", tenMinutesLater)
          .gte("appointment_time", now.toISOString());
        if (upcomingError) throw upcomingError;
        setUpcoming(upcomingAppointments);
      }
       catch (error) {
        console.error('Error fetching notifications:', error);
      }
      setLoading(false);
    };

    fetchAppointment();
  }, []);

  const formatDate = (datetime: any) => {
    const date = new Date(datetime);
    return date.toLocaleDateString();
  };

  const formatTime = (datetime: any) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const clearNotification = async () => {
    try {
      const { data: userData, error } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      await supabase.from("appointment").update({ notification: false }).eq("patient_id", userId).eq("notification", "TRUE")
      await supabase.from("cancel-appointment").update({ notification: false }).eq("patient_id", userId).eq("notification", "TRUE")
      setData([])
      setCancelled([])
    } catch {
      console.log("Error clearing notifications");
    }
  }

  const deleteNotification = async (id: String, type: 'appointment' | 'cancel-appointment') => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      const userId = userData?.user?.id;

      if (type === 'appointment') {
        await supabase
          .from('appointment')
          .update({ notification: false })
          .eq('patient_id', userId)
          .eq('id', id);
        setData(prev => prev.filter(notification => notification.id !== id));
      } else {
        await supabase
          .from('cancel-appointment')
          .update({ notification: false })
          .eq('patient_id', userId)
          .eq('id', id);
        setCancelled(prev => prev.filter(notification => notification.id !== id));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };



  return (
    <>
      <View className="flex-row items-center gap-x-3 px-8 py-5 mt-8">
        <Icon name="back" onPress={router.back} />
        <Text className="flex-1 font-UrbanistBold text-2xl">Notification</Text>
        <View className="relative">
          <Icon
            name="more-circle"
            size="lg"
            onPress={() => {
              pickerRef.current?.focus();

            }}
          />
          <View className="absolute top-10 right-10 pr-4 left-0 bottom-0 opacity-0">
            <Picker ref={pickerRef} mode="dropdown" onValueChange={(value) => {
              if (value === "clear")
                clearNotification()
            }}>
              <Picker.Item label="Clear Notifications" value="clear" style={{
                fontFamily: "UrbanistRegular",
              }} />
            </Picker>
          </View>
        </View>
      </View>
      {loading ? (
        <UIActivityIndicator color={"#246BFD"} size={32} />
      ) : (
        <ScrollView className="flex-1">
          {data.length === 0 && cancelled.length === 0 ? (
            <View className="flex-1 items-center justify-center mt-8">
              <Text className="text-xl font-UrbanistRegular">No notifications found</Text>
            </View>) : (
            <>
              {data.map((notification, index) => (
                <NotificationComponent
                  key={index}
                  notification={{
                    id: notification.id,
                    title: "Appointment Success!",
                    description: `You have successfully booked an appointment with  ${notification.doctor.name} on ${notification.appointment_date} at ${notification.appointment_time.slice(0, 5)}. Don't forget to activate your reminder.`,
                    date: formatDate(notification.created_at),
                    time: formatTime(notification.created_at),
                    type: "appointment",
                    state: "info",
                    delete: true,
                  }}
                  onDeletePress={(id) => deleteNotification(id, "appointment")}
                />
              ))}
              {upcoming.map((notification, index) => (
                <NotificationComponent
                  key={index}
                  notification={{
                    id: notification.id,
                    title: "Appointment Reminder!",
                    description: `You have an appointment approaching with  ${notification.doctor.name} on ${notification.appointment_date} at ${notification.appointment_time.slice(0, 5)} in 30 minutes.`,
                    date: formatDate(notification.created_at),
                    time: formatTime(notification.created_at),
                    type: "schedule",
                    state: "success",
                    delete: true,
                  }}
                  onDeletePress={(id) => deleteNotification(id, "appointment")}
                />
              ))}
              {cancelled.map((notification, index) => (
                <NotificationComponent
                  key={index}
                  notification={{
                    id: notification.id,
                    title: "Appointment Cancelled!",
                    description: `You have successfully cancelled your appointment with  ${notification.doctorname} on ${notification.appointment_date} at ${notification.appointment_time.slice(0, 5)}.`,
                    date: formatDate(notification.created_at),
                    time: formatTime(notification.created_at),
                    type: "appointment",
                    state: "error",
                    delete: true,
                  }}
                  onDeletePress={(id) => deleteNotification(id, "cancel-appointment")}
                />
              ))}
            </>
          )}
        </ScrollView>
      )}
    </>
  );
}
