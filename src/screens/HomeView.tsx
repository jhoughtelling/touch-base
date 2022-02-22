import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { globalBottomTabStyle } from "../styles/Global";
import GroupStack from "../routes/GroupStack";
import MessageStack from "../routes/MessageStack";
import AboutStack from "../routes/AboutStack";
import Repository from "../utils/Repository";

const Tab = createBottomTabNavigator();

const HomeView = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Repository.instance.initialize();
      setIsLoaded(true);
    })();
  }, []);

  return isLoaded ? (
    <NavigationContainer>
      <Tab.Navigator screenOptions={globalBottomTabStyle}>
        <Tab.Screen
          name="Messages"
          component={MessageStack}
          options={{
            headerShown: false,
            tabBarIcon: (props) => <Ionicons name="chatbox" size={props.size} color={props.color} />,
          }}
        />
        <Tab.Screen
          name="Groups"
          component={GroupStack}
          options={{
            headerShown: false,
            tabBarIcon: (props) => <Ionicons name="people" size={props.size} color={props.color} />,
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutStack}
          options={{
            headerShown: false,
            tabBarIcon: (props) => <Ionicons name="settings" size={props.size} color={props.color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 32 }}>Loading...</Text>
    </View>
  );
};

export default HomeView;
