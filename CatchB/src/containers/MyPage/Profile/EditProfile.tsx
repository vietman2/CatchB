import { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

import { MyPageStackScreenProps } from "../../../variables/navigation";
import { themeColors } from "../../../variables/colors";

export default function EditProfile() {
  const route = useRoute<MyPageStackScreenProps<"EditProfile">["route"]>();
  const { title, detail } = route.params;
  const [value, setValue] = useState<string>(detail);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
            새로운 {title}을 입력해주세요
          </Text>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(text) => setValue(text)}
            testID="edit-profile-text-input"
          />
        </View>
      </TouchableWithoutFeedback>
      <Button>확인</Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  textInput: {
    marginTop: 20,
    backgroundColor: themeColors.secondaryContainer,
  },
});
