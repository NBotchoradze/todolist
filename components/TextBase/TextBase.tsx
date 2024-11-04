import React, { ReactNode } from "react";
import { Text, type StyleProp, type TextStyle } from "react-native";

interface TextBaseProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

export const TextBase = (props: TextBaseProps) => {
  const { children, style } = props;

  const text = children;

  return <Text style={[style, { fontFamily: "Poppins-Regular" }]}>{text}</Text>;
};
