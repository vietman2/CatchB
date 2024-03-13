import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon, Snackbar, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";

import { MyDivider, Preview, Tags } from "./fragments";
import { forumChoices, MyImageAsset } from "./variables";
import { Selector } from "../../../components/Selectors";
import {
  getTagsList,
  uploadImageFile,
} from "../../../services/community/media";
import { createPost } from "../../../services/community/post";
import { themeColors } from "../../../variables/colors";
import { CommunityStackScreenProps } from "../../../variables/navigation";
import { TagType } from "../../../variables/types/community";
import { RootState } from "../../../store/store";
import { getTemp, removeTemp, saveTemp } from "../../../store/asyncStorage";

export default function PostCreate() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedForum, setSelectedForum] = useState<string>("덕아웃");
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [uploadedImages, setUploadedImages] = useState<MyImageAsset[]>([]);

  const [tagChoices, setTagChoices] = useState<Record<string, TagType[]>>();
  const [snackbarText, setSnackbarText] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigation =
    useNavigation<CommunityStackScreenProps<"PostCreate">["navigation"]>();

  useEffect(() => {
    const fetchTags = async () => {
      const response = await getTagsList();

      if (response.status === 200) {
        setTagChoices(response.data);
      }
    };

    const getSavedPost = async () => {
      const tempPost = await getTemp();

      if (tempPost) {
        Alert.alert("임시 저장된 글이 있습니다.", "이어서 작성하시겠습니까?", [
          {
            text: "네",
            onPress: async () => {
              setUploadedImages(tempPost.uploadedImages);
              setTitle(tempPost.title);
              setContent(tempPost.content);
              setSelectedForum(tempPost.selectedForum);

              await removeTemp();
            },
          },
          {
            text: "아니요",
            onPress: async () => {
              await removeTemp();
            },
          },
        ]);
      }
    };

    fetchTags();
    getSavedPost();
  }, []);

  const handleCreatePost = async () => {
    const response = await createPost(
      selectedForum,
      user.uuid,
      title,
      content,
      selectedTags.map((tag) => tag.id),
      uploadedImages.map((img) => img.id),
      token
    );

    if (response.status !== 201) {
      if (response.data.message) {
        setSnackbarText(response.data.message);
      } else {
        setSnackbarText("오류가 발생했습니다.");
      }
      setVisible(true);
      return;
    }

    // TODO: + setSelectedPost to new post
    //navigation.navigate("CommunityScreen"); // 새로운 글의 PostDetail로 바로 이동
  };

  const handleForumSelect = (forum: string) => {
    setSelectedForum(forum);
    setSelectedTags([tagChoices[forum][0]]);
  };

  const closeSnackbar = () => {
    setVisible(false);
  };

  const uploadImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsMultipleSelection: false,
    });

    if (result.canceled) return;

    const image = result;
    const imageAsset = image.assets[0];

    if (uploadedImages.some((img) => img.fileName === imageAsset.fileName)) {
      // if same image is already uploaded, skip
      setSnackbarText("이미 업로드된 사진입니다.");
      setVisible(true);
      return;
    }

    const response = await uploadImageFile(user.uuid, imageAsset);

    if (response.status !== 201) {
      setSnackbarText("이미지 업로드에 실패했습니다.");
      setVisible(true);
    } else {
      const url = response.data.url;
      const id = response.data.id;
      setUploadedImages((prev) => [
        ...prev,
        { id, url, fileName: imageAsset.fileName },
      ]);

      const newContent =
        content +
        `\n![업로드${uploadedImages.length + 1}](${imageAsset.fileName})`;
      setContent(newContent);
    }
  };

  const handleTemporarySave = async () => {
    await saveTemp(title, content, selectedForum, uploadedImages);
    navigation.navigate("CommunityScreen");
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode="on-drag"
      >
        <Text style={styles.subtitle}>게시판</Text>
        <Selector
          multiple={false}
          numItemsInRow={3}
          options={forumChoices}
          singleSelected={selectedForum}
          setSingleSelected={handleForumSelect}
        />
        <Tags
          tagChoices={tagChoices}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          setSnackbarText={setSnackbarText}
          setVisible={setVisible}
          selectedForum={selectedForum}
        />
        <MyDivider />
        <TextInput
          label="제목"
          mode="outlined"
          value={title}
          onChangeText={setTitle}
          right={
            <TextInput.Affix
              text={`${title.length}/40`}
              textStyle={styles.count}
            />
          }
          dense
          error={title.length > 40}
          style={styles.textInput}
          testID="titleInput"
        />
        <TextInput
          label="내용"
          mode="outlined"
          value={content}
          onChangeText={setContent}
          dense
          style={styles.textInput}
          multiline
          right={
            <TextInput.Icon
              icon="image-plus"
              color="green"
              onPress={uploadImage}
            />
          }
          testID="contentInput"
        />
        {uploadedImages.length > 0 && (
          <>
            <MyDivider />
            <Text style={styles.subtitle}>포함된 이미지</Text>
            {uploadedImages.map((image) => (
              <View style={styles.box} key={image.url}>
                <Icon source="image" size={24} color="green" />
                <Text variant="titleMedium" style={styles.text}>
                  {image.fileName}
                </Text>
              </View>
            ))}
          </>
        )}
        <MyDivider />
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.tempButton]}
            onPress={handleTemporarySave}
          >
            <Text style={styles.buttonText}>임시 저장</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.uploadButton]}
            onPress={handleCreatePost}
          >
            <Text style={styles.buttonText}>등록</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space} />
      </ScrollView>
      <Preview content={content} uploadedImages={uploadedImages} />
      <Snackbar
        visible={visible}
        onDismiss={closeSnackbar}
        action={{
          label: "닫기",
          onPress: closeSnackbar,
        }}
      >
        {snackbarText}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
  },
  subtitle: {
    marginVertical: 5,
    paddingLeft: 10,
    fontSize: 18,
  },
  textInput: {
    backgroundColor: "white",
    marginBottom: 15,
  },
  count: {
    color: "gray",
    fontSize: 14,
  },
  space: {
    height: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tempButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "gray",
  },
  uploadButton: {
    flex: 3,
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  box: {
    flexDirection: "row",
    backgroundColor: "rgba(192, 192, 192, 0.15)",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  text: {
    marginLeft: 10,
  },
});
