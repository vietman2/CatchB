import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Text, TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { ImagePickerAsset } from "expo-image-picker";

import { InputText, PostHeader } from "../fragments";
import { ImagePicker } from ".components/Pickers";
import { Selector } from ".components/Selectors";
import { CommunityScreenProps } from ".constants/navigation";
import { reasonChoices } from ".enums/community";
import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";

export default function CommunityReport() {
  const [selectedReason, setSelectedReason] = useState<string>("욕설/비방");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<ImagePickerAsset[]>([]);

  const user = useSelector((state: RootState) => state.auth.user);
  const route = useRoute<CommunityScreenProps<"PostReport">["route"]>();

  const handleSubmit = () => {
    console.log(content);
  };

  return (
    <ScrollView style={styles.container} automaticallyAdjustKeyboardInsets>
      <Text style={styles.title} variant="headlineMedium">
        게시글 신고
      </Text>
      <Divider style={styles.divider} />
      <InputText title="신고자 이름" text={user.full_name} disabled />
      <InputText title="신고자 전화번호" text={user.phone_number} disabled />
      <Text variant="titleMedium">신고할 게시글</Text>
      <View style={styles.postheader}>
        <PostHeader post={route.params.post} simple />
      </View>
      <Text variant="titleMedium">신고 사유</Text>
      <View style={styles.space}>
        <Selector
          options={reasonChoices}
          numItemsInRow={2}
          singleSelected={selectedReason}
          setSingleSelected={setSelectedReason}
        />
      </View>
      <Text variant="titleMedium">신고 내용</Text>
      <View style={styles.space} />
      <TextInput
        mode="outlined"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={5}
        placeholder={
          "간략하게 신고 내용을 작성해주세요.\n빈칸으로 두어도 괜찮아요!"
        }
      />
      <View style={styles.space} />
      <Text variant="titleMedium">스크린샷 첨부 (최대 3장)</Text>
      <View style={styles.space} />
      <ImagePicker
        uploadedImages={images}
        setUploadedImages={setImages}
        maxImages={3}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>신고하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Catch B Bold",
    marginTop: 20,
    marginBottom: 10,
    color: themeColors.primary,
  },
  divider: {
    marginVertical: 5,
  },
  disabled: {
    backgroundColor: "rgba(192, 192, 192, 0.15)",
    height: 40,
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 5,
  },
  postheader: {
    marginVertical: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: themeColors.secondaryContainer,
  },
  space: {
    marginTop: 10,
  },
  button: {
    backgroundColor: themeColors.tertiaryContainer,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
  },
});
