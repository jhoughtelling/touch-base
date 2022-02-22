import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { globalHeaderStyle } from "../styles/Global";
import AboutView from "../screens/AboutView";

export type StackParamList = {
  AboutView: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function AboutStack() {
  return (
    <Stack.Navigator screenOptions={globalHeaderStyle}>
      <Stack.Screen name="AboutView" component={AboutView} options={{ headerBackTitle: "", title: "About" }} />
    </Stack.Navigator>
  );
}
