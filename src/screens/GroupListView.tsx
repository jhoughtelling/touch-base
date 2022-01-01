import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, FlatList, View, Text } from "react-native";
import { StackParamList } from "../routes/GroupStack";
import { globalStyles } from "../styles/Global";
import ListItem from "../components/ListItem";
import HeaderButton from "../components/HeaderButton";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Group } from "../models/Group";
import Repository from "../utils/Repository";

type GroupListViewProps = {
  navigation: NativeStackNavigationProp<StackParamList, "ListGroups">;
};

const GroupListView = ({ navigation }: GroupListViewProps) => {
  const [groups, setGroups] = useState(Repository.getInstance().groups());

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton icon="add-outline" iconSize={32} onPress={() => navigation.navigate("EditGroup", {})} />
      ),
    });
  }, []);

  useEffect(() => {
    const removeListener = navigation.addListener("focus", () => {
      setGroups([...Repository.getInstance().groups()]);
    });
    return () => {
      removeListener;
    };
  }, [navigation]);

  const handleDeleteGroup = async (group: Group) => {
    await Repository.getInstance().deleteGroup(group.key);
    setGroups([...Repository.getInstance().groups()]);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList
        data={groups}
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
            onSwipeableRightOpen={() => handleDeleteGroup(item)}
          >
            <ListItem
              text={item.name}
              rightArrow={true}
              onPress={() => navigation.push("ViewGroup", { groupKey: item.key })}
            />
          </Swipeable>
        )}
      />
    </SafeAreaView>
  );
};

export default GroupListView;
