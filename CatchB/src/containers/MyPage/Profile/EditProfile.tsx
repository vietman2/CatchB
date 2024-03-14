import { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Alert
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

import { MyPageStackScreenProps } from "../../../variables/navigation";
import { themeColors } from ".themes/colors";

export default function EditProfile() {
  const route = useRoute<MyPageStackScreenProps<"EditProfile">["route"]>();
  const { title, detail } = route.params;
  const [value, setValue] = useState<string>(detail);

  const handleButton = () => {
    if (value === "") {
      Alert.alert("내용을 입력해주세요");
      return;
    }
    if (value === detail) {
      Alert.alert("변경된 내용이 없습니다");
      return;
    }

    Alert.alert("변경되었습니다", "");
  };

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
            mode="outlined"
            onChangeText={(text) => setValue(text)}
            testID="edit-profile-text-input"
          />
          <Button mode="contained" onPress={handleButton}>확인</Button>
        </View>
      </TouchableWithoutFeedback>
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
    marginVertical: 20,
  },
});
