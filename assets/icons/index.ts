import React from "react";
import { homeSelected, home } from "./home";
import { appointmentSelected, appointment } from "./appointment";
import { history, historySelected } from "./history";
import { articles, articlesSelected } from "./articles";
import { profile, profileSelected } from "./profile";
import { dentist } from "./dentist";
import { general } from "./general";
import { more } from "./more";
import { neurologist } from "./neurologist";
import { nutritionist } from "./nutritionist";
import { opthamologist } from "./opthamologist";
import { pediatric } from "./pediatric";
import { radiologist } from "./radiologist";

export enum TabsType {
  HOME = "Home",
  APPOINTMENT = "Appointment",
  HISTORY = "History",
  ARTICLES = "Articles",
  PROFILE = "Profile",
}

export const TabsIcons = {
  filled: {
    [TabsType.HOME]: homeSelected,
    [TabsType.APPOINTMENT]: appointmentSelected,
    [TabsType.HISTORY]: historySelected,
    [TabsType.ARTICLES]: articlesSelected,
    [TabsType.PROFILE]: profileSelected,
  },
  outlined: {
    [TabsType.HOME]: home,
    [TabsType.APPOINTMENT]: appointment,
    [TabsType.HISTORY]: history,
    [TabsType.ARTICLES]: articles,
    [TabsType.PROFILE]: profile,
  },
};

export const MenuIcons: { [key: string]: string } = {
  dentist,
  general,
  more,
  neurologist,
  nutritionist,
  opthamologist,
  pediatric,
  radiologist,
};
