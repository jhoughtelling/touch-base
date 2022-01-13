import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { StackParamList } from "../routes/GroupStack";
import { globalStyles } from "../styles/Global";
import TextButton from "../components/TextButton";
import { RouteProp } from "@react-navigation/native";
import Repository from "../utils/Repository";

type GroupEditViewProps = {
  navigation: NativeStackNavigationProp<StackParamList, "EditGroup">;
  route: RouteProp<{ params: { groupKey: string } }, "params">;
};

const GroupEditView = ({ navigation, route }: GroupEditViewProps) => {
  let repo = Repository.instance;

  const [name, setName] = useState(route.params.groupKey ? repo.getGroup(route.params.groupKey).name : "");

  const save = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    await repo.createOrUpdateGroup({ key: route.params.groupKey, name: name });
    navigation.pop();
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.content}>
        <View style={globalStyles.textInputWrapper}>
          <Text style={globalStyles.label}>Group name</Text>
          <TextInput
            style={globalStyles.textInput}
            selectTextOnFocus={true}
            onChangeText={setName}
            value={name}
            returnKeyType="done"
          />
        </View>
        <View style={globalStyles.buttonWrapper}>
          <TextButton title={route.params.groupKey ? "Update" : "Create"} onPress={() => save()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GroupEditView;
