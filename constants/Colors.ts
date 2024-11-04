/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { Dimensions, Platform } from "react-native";


const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
export const colors = {
  backgroundBlue: "#E8F1FD",
  nameColor: "#545871",
  searchBarWhite: "#FFFEFC",
  textColor: "#30507D",
  lineColor: "#6A6CE0",
  taskBackColor: "#F6FAFF",
  taskTextColor: "#6C86A8",
};

export const IS_IOS = Platform.OS === "ios";
export const WIDTH = Dimensions.get("screen").width;

