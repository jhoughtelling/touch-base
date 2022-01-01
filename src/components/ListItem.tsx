import React from "react";
import { Pressable, Text, View } from "react-native";
import { globalStyles } from "../styles/Global";

type ListItemProps = {
  text: string;
  onPress?(): void;
  rightArrow?: boolean;
};

const ListItem = (props: ListItemProps) => (
  <Pressable onPress={props.onPress}>
    <View style={globalStyles.item}>
      <Text style={globalStyles.itemText}>{props.text}</Text>
      {props.rightArrow && <Text style={globalStyles.arrowButton}>&gt;</Text>}
    </View>
  </Pressable>
);

export default ListItem;
