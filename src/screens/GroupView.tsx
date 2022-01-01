import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { SafeAreaView, FlatList, View, Text } from "react-native";
import { StackParamList } from "../routes/GroupStack";
import { globalStyles } from "../styles/Global";
import ListItem from "../components/ListItem";
import HeaderButton from "../components/HeaderButton";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Contact } from "../models/Contact";
import Repository from "../utils/Repository";

type GroupViewProps = {
  navigation: NativeStackNavigationProp<StackParamList, "ViewGroup">;
  route: RouteProp<{ params: { groupKey: string } }, "params">;
};

const GroupView = ({ navigation, route }: GroupViewProps) => {
  const group = Repository.getInstance().getGroup(route.params.groupKey);
  const [contacts, setContacts] = useState(group.contacts);

  const handleDeleteContact = async (contact: Contact) => {
    await Repository.getInstance().deleteContact(contact.key);
    setContacts([...group.contacts]);
  };

  const handleEditGroup = () => {
    navigation.navigate("EditGroup", { groupKey: route.params.groupKey });
  };

  const handleAddContact = () => {
    navigation.navigate("EditContact", {
      groupKey: route.params.groupKey,
      contact: { key: "", firstName: "", lastName: "", phone: "" },
    });
  };

  useEffect(() => {
    const removeListener = navigation.addListener("focus", () => {
      setContacts([...group.contacts]);
    });
    return () => {
      removeListener;
    };
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: group.name + " (" + contacts.length + ")",
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <HeaderButton icon="settings-outline" iconSize={24} onPress={handleEditGroup} />
          <HeaderButton icon="add-outline" iconSize={32} onPress={handleAddContact} />
        </View>
      ),
    });
  });

  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={contacts}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Swipeable
            key={item.key}
            overshootFriction={8}
            renderRightActions={() => (
              <View style={globalStyles.rightActionDelete}>
                <Text style={globalStyles.rightActionDeleteText}>Remove</Text>
              </View>
            )}
            onSwipeableRightOpen={() => handleDeleteContact(item)}
          >
            <ListItem
              text={item.lastName + ", " + item.firstName}
              rightArrow={true}
              onPress={() => navigation.navigate("EditContact", { groupKey: route.params.groupKey, contact: item })}
            />
          </Swipeable>
        )}
      />
    </SafeAreaView>
  );
};

export default GroupView;
