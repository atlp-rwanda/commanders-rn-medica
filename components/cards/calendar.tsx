import {
  leftFilledArrowIcon,
  rightFilledArrowIcon,
} from "@/assets/icons/arrow";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import {
  DateData,
  Calendar as DefaultCalendar,
  CalendarProps as DefaultCalendarProps
} from "react-native-calendars";
import { Direction } from "react-native-calendars/src/types";
import { SvgXml } from "react-native-svg";
import { Text } from "../ThemedText";

type CalendarProps = {
  date?: Date;
  minDate?: DefaultCalendarProps["minDate"];
  onDateChange?: (date: Date) => void;
};

const today = new Date();
const appendZero = (num: number) => (num < 10 ? `0${num}` : num);

export function Calendar(props: CalendarProps) {
  const [selected, setSelected] = useState(props.date?.toDateString() || "");


  const marked = useMemo(() => {
    return {
      [`${today.getFullYear()}-${appendZero(today.getMonth() + 1)}-${appendZero(today.getDate())}`]: {
        marked: true,
        dotColor: "#246BFD",
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "#246BFD",
        selectedTextColor: "#fff",
      },
    };
  }, [selected]);

  const onDayPress = useCallback((day: DateData) => {
    setSelected(day.dateString);
    props.onDateChange?.(new Date(day.dateString));
  }, []);

  return (
    <View className="p-1 rounded-xl bg-primary-50">
      <DefaultCalendar
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",
          textDayFontFamily: "UrbanistRegular",
          textMonthFontFamily: "UrbanistBold",
          textDayHeaderFontFamily: "UrbanistBold",
          todayButtonFontFamily: "UrbanistSemiBold",
          monthTextColor: "#424242",
          todayTextColor: "#424242",
          todayDotColor: "#246BFD",
          textDisabledColor: "#9E9E9E",
          textSectionTitleDisabledColor: "#9E9E9E",
          textSectionTitleColor: "#212121",
        }}
        hideExtraDays={true}
        current={selected}
        markedDates={marked}
        onDayPress={onDayPress}
        renderHeader={HeadTitle}
        renderArrow={CustomArrow}
        minDate={props.minDate}
      />
    </View>
  );
}

const CustomArrow = (direction: Direction) => {
  return direction === "left" ? (
    <View className="w-8 h-8">
      <SvgXml xml={leftFilledArrowIcon} width={"100%"} height={"100%"} className="text-primary-500" />
    </View>
  ) : (
    <View className="w-8 h-8">
      <SvgXml xml={rightFilledArrowIcon} width={"100%"} height={"100%"} className="text-primary-500" />
    </View>
  );
};

const HeadTitle = (date?: any) => {
  return (
    date && (
      <Text className="flex-grow-0 text-lg font-UrbanistBold py-3">
        {date.toString("MMMM yyyy")}
      </Text>
    )
  );
};
