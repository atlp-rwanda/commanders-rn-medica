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
        className="rounded-[30px] mt-6"
        style={{
          borderRadius: 30,
          marginTop: 24,
          elevation: 10,
        }}
      >
        <Carousel
          vertical={false}
          width={width}
          height={width / 2}
          ref={ref}
          defaultScrollOffsetValue={scrollOffsetValue}
          testID={"banner"}
          style={{ width: "100%" }}
          data={data}
          pagingEnabled={true}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={({ index }) => (
            <View key={index} className="h-full p-6">
              <View className="justify-evenly w-[55%] h-full">
                <Text className="text-[24px] font-['Urbanist-Bold'] text-white">
                  Medical Checks!
                </Text>
                <Text className="text-xs font-['Urbanist-Regular'] text-white flex-wrap">
                  Check your health condition regularly to minimize the
                  incidence of disease in the future.
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="w-[105px] h-8 bg-white rounded-3xl items-center justify-center"
                >
                  <Text className="text-sm font-['Urbanist-SemiBold'] text-primary-500">
                    Check Now
                  </Text>
                </TouchableOpacity>
              </View>
              <ImageBackground
                source={require("../assets/images/bannerImg.png")}
                className="w-48 h-80 absolute rounded-[30px] right-[10%] top-6"
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
