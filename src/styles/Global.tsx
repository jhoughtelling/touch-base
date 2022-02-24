import { StyleSheet } from "react-native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export class Constants {
  static primaryColor: string = "#6715eb";
  static secondaryColor: string = "#dc21eb";
  static tertiaryColor: string = "#80eb2d";
}

export const globalHeaderStyle: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Constants.primaryColor,
  },
  headerTitleAlign: "center",
  headerTintColor: "#fff",
};

export const globalBottomTabStyle: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: "#000",
  tabBarInactiveTintColor: "#999",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 25,
    padding: 30,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#e6e7e9",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#424242",
  },
  button: {
    backgroundColor: Constants.secondaryColor,
    padding: 15,
    borderRadius: 30,
  },
  buttonWrapper: {
    marginTop: 35,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  item: {
    flex: 2,
    flexDirection: "row",
    padding: 15,
    width: "100%",
    borderColor: "#ddd",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    width: "100%",
    height: 22,
  },
  arrowButton: {
    fontSize: 18,
    textAlign: "right",
    right: 15,
  },
  textInputWrapper: {
    marginBottom: 15,
  },
  textInput: {
    padding: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#c7c7c7",
    borderRadius: 8,
  },
  multiLineInput: {
    padding: 15,
    paddingTop: 20,
    backgroundColor: "#fff",
    fontSize: 18,
  },
  sectionHeader: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingLeft: 10,
  },
  sectionHeaderText: {
    color: "#888",
  },
  rightActionDelete: {
    backgroundColor: "#f00",
    justifyContent: "center",
    padding: 20,
    flex: 1,
    alignItems: "flex-end",
  },
  rightActionDeleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
