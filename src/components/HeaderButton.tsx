import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";

type HeaderButtonProps = {
  icon?: any;
  iconSize?: number;
  title?: string;
  onPress(): void;
};

const HeaderButton = (props: HeaderButtonProps) => (
  <Pressable onPress={props.onPress}>
    <View style={{ flexDirection: "row", marginLeft: 20, marginRight: Platform.OS == "ios" ? -10 : 12 }}>
      {props.icon && <Ionicons name={props.icon} color={"#fff"} size={props.iconSize ? props.iconSize : 28} />}
      {props.title && <Text style={{ color: "#fff", fontSize: 18 }}>{props.title}</Text>}
    </View>
  </Pressable>
);

export default HeaderButton;
