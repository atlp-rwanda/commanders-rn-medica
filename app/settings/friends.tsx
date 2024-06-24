import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from "react-native";
import { router } from "expo-router";
import { Icon } from "@/components/Icon";
import * as Contacts from "expo-contacts";
import { supabase } from "../supabase";

interface Contact {
  image: any;
  name: string;
  phone: string;
  key: number;
  invited: boolean;
}

export default function Friends() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function requestPermission() {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access contacts was denied");
        setLoading(false);
        return;
      }
      await loadContacts();
    }

    async function loadContacts() {
      try {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });

        if (data.length > 0) {
          const formattedContacts: Contact[] = data.map((contact, index) => ({
            image: {
              uri: contact.imageAvailable
                ? contact.image?.uri
                : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg",
            },
            name: truncateContactName(contact.name ?? "Unknown"),
            phone: extractPhoneNumber(contact),
            key: index,
            invited: false,
          }));
          setContacts(formattedContacts);
          await fetchInvitedContacts(formattedContacts);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        Alert.alert("Error fetching contacts");
      } finally {
        setLoading(false);
      }
    }

    requestPermission();
  }, []);

  const truncateContactName = (name: string, maxLength = 15) => {
    if (name.length <= maxLength) {
      return name;
    } else {
      return name.substring(0, maxLength) + "...";
    }
  };

  const extractPhoneNumber = (contact: Contacts.Contact) => {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      return contact.phoneNumbers[0].number ?? "N/A";
    } else {
      return "N/A";
    }
  };

  const fetchInvitedContacts = async (loadedContacts: Contact[]) => {
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id;
      const { data, error } = await supabase
        .from("invited_contacts")
        .select("phone")
        .eq("user_id", userId);

      if (data) {
        const invitedPhones = data.map((item) => item.phone);
        const updatedContacts = loadedContacts.map((contact) => ({
          ...contact,
          invited: invitedPhones.includes(contact.phone),
        }));
        setContacts(updatedContacts);
      }
    } catch (error) {
      console.error("Error fetching invited contacts from Supabase:", error);
    }
  };

  const handleInviteClick = async (index: number) => {
    if (contacts[index].invited) {
      Alert.alert(
        "Already Invited",
        `${contacts[index].name} has already been invited.`
      );
    } else {
      Alert.alert(
        "New Invitation",
        `Are you sure you want to send an invitation to ${contacts[index].name}?`,
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              let phoneNumber = contacts[index].phone
                .trim()
                .replace(/\s+/g, "");
              if (!phoneNumber.startsWith("+25")) {
                phoneNumber = "+25" + phoneNumber;
              }

              const message = `Hey ${contacts[index].name}, check out this app I'm using! [https://3-d-portifolio-gules.vercel.app/]`;
              const url = `whatsapp://send?text=${encodeURIComponent(
                message
              )}&phone=${encodeURIComponent(phoneNumber)}`;

              try {
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                  await Linking.openURL(url);
                  await supabase.from("invited_contacts").insert([
                    {
                      user_id: (await supabase.auth.getUser()).data.user?.id,
                      phone: contacts[index].phone,
                    },
                  ]);

                  // Update the invited status after successful invitation
                  const newContacts = [...contacts];
                  newContacts[index].invited = true;
                  setContacts(newContacts);
                } else {
                  Alert.alert("WhatsApp is not installed on your device");
                }
              } catch (error) {
                console.error("Error opening WhatsApp:", error);
                Alert.alert("Error opening WhatsApp");
              }
            },
          },
        ]
      );
    }
  };
  
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="bg-white flex-1 px-4 py-10">
      <View className="flex-row px-2 py-6">
        <Icon name="back" onPress={router.back} />
        <Text className="flex-1 font-UrbanistBold text-2xl ml-4 mt-[-6px]">
          Invite Friends
        </Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item, index }) => (
          <View className="flex-row justify-between mt-2">
            <View className="flex-row mb-4">
              <Image source={item.image} className="w-20 h-20 rounded-full" />
              <View className="ml-4 mt-3">
                <Text className="text-[#212121] text-[18px] font-UrbanistBold">
                  {item.name}
                </Text>
                <Text className="text-[#616161] text-[14px] font-UrbanistMedium mt-2">
                  {item.phone}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              className={`w-[75px] h-[32px] px-[16px] py-[6px] rounded-full mt-3 ${
                item.invited
                  ? "w-[82px] h-[32px] px-[16px] py-[6px] bg-white border border-blue-500"
                  : "bg-blue-500"
              }`}
              onPress={() => {
                handleInviteClick(index);
              }}
            >
              <Text
                className={`text-sm font-semibold text-center ${
                  item.invited ? "text-blue-500" : "text-white"
                }`}
              >
                {item.invited ? "Invited" : "Invite"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
