import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, SafeAreaView, View, TextInput } from "react-native";
import TextButton from "../components/TextButton";
import { Contact } from "../models/Contact";
import { StackParamList } from "../routes/GroupStack";
import { globalStyles } from "../styles/Global";
import Repository from "../utils/Repository";

type ContactEditViewProps = {
  navigation: NativeStackNavigationProp<StackParamList, "EditContact">;
  route: RouteProp<{ params: { groupKey: string; contact: Contact } }, "params">;
};

const ContactEditView = ({ navigation, route }: ContactEditViewProps) => {
  const [firstName, setFirstName] = useState(route.params.contact.firstName);
  const [lastName, setLastName] = useState(route.params.contact.lastName);
  const [phone, setPhone] = useState(route.params.contact.phone);

  const save = async () => {
    await Repository.getInstance().createOrUpdateContact({
      groupKey: route.params.groupKey,
      contactKey: route.params.contact.key,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    });
    navigation.pop();
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.content}>
        <View style={globalStyles.textInputWrapper}>
          <Text style={globalStyles.label}>First name</Text>
          <TextInput
            style={globalStyles.textInput}
            onChangeText={setFirstName}
            value={firstName}
            textContentType="givenName"
          />
        </View>
        <View style={globalStyles.textInputWrapper}>
          <Text style={globalStyles.label}>Last name</Text>
          <TextInput
            style={globalStyles.textInput}
            onChangeText={setLastName}
            value={lastName}
            textContentType="familyName"
          />
        </View>
        <View style={globalStyles.textInputWrapper}>
          <Text style={globalStyles.label}>Phone</Text>
          <TextInput
            style={globalStyles.textInput}
            onChangeText={setPhone}
            value={phone}
            textContentType="telephoneNumber"
            keyboardType="number-pad"
          />
        </View>
        <View style={globalStyles.buttonWrapper}>
          <TextButton title={route.params.contact.key ? "Update" : "Create"} onPress={() => save()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactEditView;
