import { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { themeColors } from "../../../variables/colors";
import { CommunityStackScreenProps } from "../../../variables/navigation";

export default function PostCreate() {
  const navigation =
    useNavigation<CommunityStackScreenProps<"PostCreate">["navigation"]>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleCreatePost} style={styles.button}>
          <Text variant="titleLarge" style={styles.buttonText}>
            등록
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleCreatePost = () => {
    // TODO: API 연동
    // + setSelectedPost to new post
    navigation.navigate("PostDetail");
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">준비중입니다.</Text>
      {/* 
      <TextInput placeholder="제목을 입력해주세요 (최대 50자)" mode="outlined" style={{ marginTop: 20 }} />
      <TextInput
        placeholder={"내용을 입력해주세요. (최소 20자 ~ 최대 1000자)\n사진은 최대 5장 올릴 수 있어요."}
        mode="outlined"
        style={{ marginTop: 20 }}
        multiline
        numberOfLines={10}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
    alignItems: "center",     // TODO: remove
    justifyContent: "center", // TODO: remove
  },
  button: {
    marginRight: 15,
  },
  buttonText: {
    color: themeColors.primary,
    fontWeight: "bold",
  },
});
