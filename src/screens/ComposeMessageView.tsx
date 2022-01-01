import React, { useEffect } from "react";
import { TextInput, SafeAreaView, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { globalStyles } from "../styles/Global";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../routes/MessageStack";
import HeaderButton from "../components/HeaderButton";
import { RouteProp } from "@react-navigation/native";

type ComposeMessageViewProps = {
  navigation: NativeStackNavigationProp<StackParamList, "ComposeMessage">;
  route: RouteProp<{ params: { nextAction: () => void } }, "params">;
};

const ComposeMessageView = ({ navigation }: ComposeMessageViewProps) => {
  const [message, setMessage] = React.useState("");

  const selectGroups = () => {
    Keyboard.dismiss();
    navigation.push("SelectGroups", { message: message.trim() });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title="Next" onPress={selectGroups} />,
    });
  }, [message]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <TextInput
        style={globalStyles.multiLineInput}
        placeholder="Type your message here..."
        onChangeText={setMessage}
        value={message}
        multiline={true}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}></View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ComposeMessageView;
