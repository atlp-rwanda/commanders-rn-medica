import React, { useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";

const CarouselComponent = () => {
  const { width } = useWindowDimensions();
  const scrollOffsetValue = useSharedValue<number>(0);
  const [data, setData] = React.useState([...new Array(4).keys()]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: width,
    height: width / 2,
  } as const;

  const renderPaginationDots = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        position: "absolute",
        bottom: 12,
        left: "50%",
        right: "50%",
      }}
    >
      {data.map((_, index) => (
        <View
          key={index}
          style={{
            width: index === currentIndex ? 16 : 6,
            height: 6,
            borderRadius: 4,
            backgroundColor: index === currentIndex ? "#FFFFFF" : "#E0E0E0",
            marginHorizontal: 4,
          }}
        />
      ))}
    </View>
  );

  return (
    <View
      style={{
        shadowColor: "rgba(36, 107, 253, 0.2)",
        shadowOpacity: 1,
        shadowOffset: { width: 4, height: 12 },
        shadowRadius: 10,
      }}
    >
      <LinearGradient
        colors={["#246BFD", "#5089FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 30,
          marginTop: 24,
          elevation: 10,
        }}
      >
        <Carousel
          {...baseOptions}
          loop
          enabled // Default is true, just for demo
          ref={ref}
          defaultScrollOffsetValue={scrollOffsetValue}
          testID={"banner"}
          style={{ width: "100%" }}
          data={data}
          pagingEnabled={true}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={({ index }) => (
            <View key={index} style={{ height: "100%", padding: 24 }}>
              <View
                style={{
                  justifyContent: "space-evenly",
                  width: "55%",
                  height: "100%",
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 24, letterSpacing: 0.2 }}
                >
                  Medical Checks!
                </Text>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 12,
                    flexWrap: "wrap",
                    letterSpacing: 0.2,
                  }}
                >
                  Check your health condition regularly to minimize the
                  incidence of disease in the future.
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    width: 105,
                    height: 32,
                    backgroundColor: "#fff",
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#246BFD",
                      fontSize: 14,
                      letterSpacing: 0.2,
                    }}
                  >
                    Check Now
                  </Text>
                </TouchableOpacity>
              </View>
              <ImageBackground
                source={require("../assets/images/bannerImg.png")}
                style={{
                  width: 200,
                  height: 320,
                  position: "absolute",
                  right: "10%",
                  top: 24,
                  borderRadius: 30,
                }}
              />
            </View>
          )}
        />
        {renderPaginationDots()}
      </LinearGradient>
    </View>
  );
};

export default CarouselComponent;
