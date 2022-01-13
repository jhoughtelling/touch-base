import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Text, SafeAreaView, View, Pressable, SectionList } from "react-native";
import * as SMS from "expo-sms";
import { Group } from "../models/Group";
import { StackParamList } from "../routes/MessageStack";
import { Constants, globalStyles } from "../styles/Global";
import { Contact } from "../models/Contact";
import HeaderButton from "../components/HeaderButton";

type SelectContactsViewProps = {
  navigation: NativeStackNavigationProp<StackParamList, "SelectContacts">;
  route: RouteProp<{ params: { message: string; groups: Group[] } }, "params">;
};

const SelectContactsView = ({ navigation, route }: SelectContactsViewProps) => {
  type SelectableContact = Contact & { selected: boolean };

  type Section = {
    title: string;
    data: SelectableContact[];
  };

  let sections = Array<Section>();
  route.params.groups.forEach((g) => {
    sections.push({
      title: g.name,
      data: g.contacts.map((c) => ({ ...c, ...{ selected: true, data: new Array<SelectableContact>() } })),
    });
  });

  const [groups, setGroups] = useState(sections);

  const toggleContactSelection = (contact: SelectableContact) => {
    groups.forEach((g) => {
      g.data.forEach((c) => {
        if (c.key == contact.key) {
          c.selected = !c.selected;
        }
      });
    });

    setGroups([...groups]);
  };

  const updateMessageParams = (message: Readonly<string>, contact: Contact) => {
    return message.replaceAll("@firstName", contact.firstName).replaceAll("@lastName", contact.lastName);
  };

  const sendMessage = async () => {    
    let available = await SMS.isAvailableAsync();
    if (available) {
      for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groups[i].data.length; j++) {
          if (groups[i].data[j].selected) {
            const message = updateMessageParams(route.params.message, groups[i].data[j]);
            await SMS.sendSMSAsync(groups[i].data[j].phone, message);
          }
        }
      }
      await alert("Message has been sent to all selected contacts.");
      navigation.popToTop();
    } else {
      alert("Sending messages is not avaialble on this device.");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title="Send" onPress={() => sendMessage()} />,
    });
  }, [groups]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <SectionList
        sections={groups}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Pressable onPress={() => toggleContactSelection(item)}>
            <View style={globalStyles.item}>
              {item.selected && <Ionicons name="checkmark-circle-sharp" size={20} color={Constants.secondaryColor} />}
              <Text style={globalStyles.itemText}>
                &nbsp; {item.lastName}, {item.firstName}
              </Text>
            </View>
          </Pressable>
        )}
        renderSectionHeader={(item) => (
          <View style={globalStyles.sectionHeader}>
            <Text style={globalStyles.sectionHeaderText}>{item.section.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SelectContactsView;
