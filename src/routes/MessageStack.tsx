import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Group } from "../models/Group";
import ComposeMessageView from "../screens/ComposeMessageView";
import SelectGroupsView from "../screens/SelectGroupsView";
import SelectContactsView from "../screens/SelectContactsView";
import { globalHeaderStyle } from "../styles/Global";

export type StackParamList = {
  ComposeMessage: {};
  SelectGroups: { nextAction?(): void; message: string };
  SelectContacts: { nextAction?(): void; message: string; groups: Group[] };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function MessageStack() {
  return (
    <Stack.Navigator screenOptions={globalHeaderStyle}>
      <Stack.Screen name="ComposeMessage" component={ComposeMessageView} options={{ title: "Compose Message" }} />
      <Stack.Screen name="SelectGroups" component={SelectGroupsView} options={{ title: "Select Groups" }} />
      <Stack.Screen name="SelectContacts" component={SelectContactsView} options={{ title: "Select Contacts" }} />
    </Stack.Navigator>
  );
}
