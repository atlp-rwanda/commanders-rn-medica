import { Text } from "react-native";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
type docCardProps = {
  name: string;
  role: string;
  stars: string;
  hospital: string;
  reviews: string;
  image: ImageSourcePropType;
  images: ImageSourcePropType;
  onPress?: () => void;
};

export default function DoctorCard(props: docCardProps) {
  return (
    <Pressable onPress={props.onPress} style={styles.constainer}>
      <View style={styles.card1}>
        <View style={styles.items}>
          <Image source={props.images} />
          <View style={styles.details}>
            <Text style={styles.title1}>{props.name}</Text>
            <Text style={styles.line}></Text>
            <View style={styles.docinfo}>
              <Text style={styles.title2}>{props.role}</Text>
              <Text style={styles.separator}></Text>
              <Text style={styles.title2}>{props.hospital}</Text>
            </View>
            <View style={styles.views}>
              <Image source={require("../../assets/doctors/star.png")} />
              <Text style={styles.title3}>{props.stars}</Text>
              <Text style={styles.title3}>{props.reviews}</Text>
            </View>
          </View>
          <Image source={props.image} style={styles.icons} />
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card1: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    // width: 380,
    height: 142,
    marginBottom: 20,
    elevation: 5,
  },
  constainer: {
    shadowColor: "rgba(4, 6, 15, 0.5)",
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
  },
  separator: {
    width: 1,
    height: 14,
    marginTop: 4,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#424242",
  },
  line: {
    marginVertical: 15,
    borderWidth: 0.3,
    paddingHorizontal: 50,
    height: 0,
    backgroundColor: "#EEEEEE",
    opacity: 0.1,
  },
  icons: {
    width: 15.83,
    height: 15,
  },
  items: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  details: {
    marginTop: 0,
    paddingHorizontal: 5,
  },
  views: {
    flexDirection: "row",
  },
  docinfo: {
    flexDirection: "row",
    marginTop: 10,
  },
  title1: {
    color: "#212121",
    fontSize: 18,
  },
  title2: {
    color: "#424242",
    fontSize: 12,
    marginBottom: 15,
  },
  roles: {
    color: "#424242",
    fontSize: 12,
  },
  title3: {
    top: -2,
    marginLeft: 10,
    fontSize: 12,
  },
});
