import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Text, SafeAreaView, View, FlatList, Pressable } from "react-native";
import { Group } from "../models/Group";
import { StackParamList } from "../routes/MessageStack";
import { Constants, globalStyles } from "../styles/Global";
import HeaderButton from "../components/HeaderButton";
import Repository from "../utils/Repository";
import { Message } from "../models/Message";

type SelectGroupsViewProps = {
  navigation: NativeStackNavigationProp<StackParamList, "SelectGroups">;
  route: RouteProp<{ params: { nextAction(): void; message: Message } }, "params">;
};

const SelectGroupsView = ({ navigation, route }: SelectGroupsViewProps) => {
  type SelectableGroup = Group & { selected: boolean };

  const allGroups = Repository.instance.groups();
  const selectableGroups = allGroups.map((group) => ({ ...group, ...{ selected: false } }));

  const [groups, setGroups] = useState<SelectableGroup[]>(selectableGroups);

  const toggleGroupSelection = (group: SelectableGroup) => {
    setGroups(groups!.map((item) => (item.key == group.key ? { ...item, selected: !item.selected } : item)));
  };

  const selectContacts = () => {
    navigation.navigate("SelectContacts", {
      message: route.params.message,
      groups: groups.filter((g) => g.selected),
    });
  };

  useEffect(() => {
    navigation.setOptions({ headerRight: () => <HeaderButton title="Next" onPress={() => selectContacts()} /> });
  }, [groups]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Pressable onPress={() => toggleGroupSelection(item)}>
            <View style={globalStyles.item}>
              {item.selected && <Ionicons name="checkmark-circle-sharp" size={20} color={Constants.secondaryColor} />}
              {!item.selected && <Text style={{ width: 20 }} />}
              <Text style={globalStyles.itemText}>&nbsp; {item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default SelectGroupsView;
