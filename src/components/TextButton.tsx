import React from "react";
import { Pressable, Text } from "react-native";
import { globalStyles } from "../styles/Global";

type TextButtonProps = {
  title: string;
  onPress(): void;
};

const TextButton = (props: TextButtonProps) => (
  <Pressable style={globalStyles.button} onPress={props.onPress}>
    <Text style={globalStyles.buttonText}>{props.title}</Text>
  </Pressable>
);

export default TextButton;
