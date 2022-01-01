import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroupListView from "../screens/GroupListView";
import ContactEditView from "../screens/ContactEditView";
import { Contact } from "../models/Contact";
import { globalHeaderStyle } from "../styles/Global";
import GroupView from "../screens/GroupView";
import GroupEditView from "../screens/GroupEditView";

export type StackParamList = {
  ListGroups: undefined;
  ViewGroup: { groupKey: string };
  EditContact: { groupKey: string; contact: Contact };
  EditGroup: { groupKey?: string };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function GroupStack() {
  return (
    <Stack.Navigator screenOptions={globalHeaderStyle}>
      <Stack.Screen name="ListGroups" component={GroupListView} options={{ headerBackTitle: "", title: "Groups" }} />
      <Stack.Screen name="ViewGroup" component={GroupView} options={{ headerBackTitle: "", title: "" }} />
      <Stack.Screen
        name="EditContact"
        component={ContactEditView}
        options={{ headerBackTitle: "", title: "Contact" }}
      />
      <Stack.Screen name="EditGroup" component={GroupEditView} options={{ headerBackTitle: "", title: "Group" }} />
    </Stack.Navigator>
  );
}
