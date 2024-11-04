import React from "react";
import {
  Pressable,
  type StyleProp,
  type ViewStyle,
  TextStyle,
  StyleSheet,
} from "react-native";

import { TextBase } from "../TextBase/TextBase";
import { colors, WIDTH } from "@/constants/Colors";


interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  text: string;
  onPress: () => void;
}

export const Button = (props: ButtonProps) => {
  const { style, styleText, text, onPress } = props;

  return (
    <Pressable style={[styles.btn, style]} onPress={onPress}>
      <TextBase style={[styles.btnText, styleText]}>{text}</TextBase>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.lineColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    height: 45,
    width: WIDTH - 25,
  },

  btnText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
});
