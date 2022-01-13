import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { Text, SafeAreaView, View, TextInput, KeyboardAvoidingView, ScrollView, Keyboard } from "react-native";
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
  const [nickName, setNickName] = useState(route.params.contact.nickName);
  const [phone, setPhone] = useState(route.params.contact.phone);

  const save = async () => {
    await Repository.instance.createOrUpdateContact({
      groupKey: route.params.groupKey,
      contactKey: route.params.contact.key,
      firstName: firstName,
      lastName: lastName,
      nickName: nickName,
      phone: phone,
    });
    navigation.pop();
  };

  const refFirstNameInput = useRef<TextInput>(null);
  const refLastNameInput = useRef<TextInput>(null);
  const refNickNameInput = useRef<TextInput>(null);
  const refPhoneInput = useRef<TextInput>(null);

  return (
    <ScrollView style={globalStyles.container}>
      <KeyboardAvoidingView style={globalStyles.content}>
        <View style={globalStyles.textInputWrapper}>
          <Text style={globalStyles.label}>First name</Text>
          <TextInput
            ref={refFirstNameInput}
            style={globalStyles.textInput}
            selectTextOnFocus={true}
            onChangeText={setFirstName}
            value={firstName}
            textContentType="givenName"
            returnKeyType="next"
            onSubmitEditing={() => refLastNameInput.current?.focus()}
          />
        </View>
        <View style={globalStyles.textInputWrapper}>
          <Text style={globalStyles.label}>Last name</Text>
          <TextInput
            ref={refLastNameInput}
            style={globalStyles.textInput}
            selectTextOnFocus={true}
            onChangeText={setLastName}
            value={lastName}
            textContentType="familyName"
            returnKeyType="next"
            onSubmitEditing={() => refNickNameInput.current?.focus()}
          />
        </View>
        <View style={globalStyles.textInputWrapper}>
          <Text style={globalStyles.label}>Nick name</Text>
          <TextInput
            ref={refNickNameInput}
            style={globalStyles.textInput}
            selectTextOnFocus={true}
            onChangeText={setNickName}
            value={nickName}
            textContentType="nickname"
            returnKeyType="next"
            onSubmitEditing={() => refPhoneInput.current?.focus()}
          />
        </View>
        <View style={globalStyles.textInputWrapper}>
          <Text style={globalStyles.label}>Phone</Text>
          <TextInput
            ref={refPhoneInput}
            style={globalStyles.textInput}
            selectTextOnFocus={true}
            onChangeText={setPhone}
            value={phone}
            textContentType="telephoneNumber"
            keyboardType="number-pad"
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
        <View style={globalStyles.buttonWrapper}>
          <TextButton title={route.params.contact.key ? "Update" : "Create"} onPress={() => save()} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ContactEditView;
