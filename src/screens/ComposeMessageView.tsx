import React, { useEffect } from "react";
import { TextInput, SafeAreaView, View, TouchableWithoutFeedback, Keyboard, Pressable, Text, Image } from "react-native";
import { globalStyles } from "../styles/Global";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../routes/MessageStack";
import HeaderButton from "../components/HeaderButton";
import { RouteProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker";
import FileSystem from "expo-file-system";

type ComposeMessageViewProps = {
  navigation: NativeStackNavigationProp<StackParamList, "ComposeMessage">;
  route: RouteProp<{ params: { nextAction: () => void } }, "params">;
};

const ComposeMessageView = ({ navigation }: ComposeMessageViewProps) => {
  const [message, setMessage] = React.useState("");
  const [images, setImages] = React.useState(new Array<string>());

  const selectGroups = () => {
    Keyboard.dismiss();
    navigation.push("SelectGroups", { message: { text: message.trim(), images: images } });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title="Next" onPress={selectGroups} />,
    });
  }, [message]);

  const attachImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.cancelled) {
      const imageInfo = result as ImageInfo;
      setImages((current) => [...current, imageInfo.uri]);
    }
  };

  const removeImage = async (uri: string) => {
    setImages((current) => current.filter((c) => c != uri));
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <TextInput
        style={[globalStyles.multiLineInput, { minHeight: 250 }]}
        placeholder="Type your message here..."
        onChangeText={setMessage}
        value={message}
        multiline={true}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={{ flexDirection: "row" }}>
            {images.map((i) => (
              <Pressable key={i} onPress={() => removeImage(i)}>
                <Image source={{ uri: i }} style={{ borderWidth: 1, borderColor: "black", width: 100, height: 100 }} />
              </Pressable>
            ))}
            <Pressable
              onPress={attachImages}
              style={{
                borderWidth: 1,
                borderColor: "black",
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 40 }}>+</Text>
              <Text>Attach image</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ComposeMessageView;
