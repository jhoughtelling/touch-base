import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { StackParamList } from "../routes/AboutStack";
import { globalStyles } from "../styles/Global";

type AboutViewProps = {
  navigation: NativeStackNavigationProp<StackParamList, "AboutView">;
};

const AboutView = ({}: AboutViewProps) => {
  return (
    <KeyboardAvoidingView style={globalStyles.container}>
      <View style={globalStyles.content}>
        <Text>Touch Base</Text>
        <Text>by Jerod Houghtelling</Text>
        <Text>version 1.0.0</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AboutView;
