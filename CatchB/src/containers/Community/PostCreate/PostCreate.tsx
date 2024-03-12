import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Icon, Snackbar, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";

import { forumChoices, MyImageAsset } from "./variables";
import { Tag, Preview } from "../fragments";
import { Selector } from "../../../components/Selectors";
import { getTagsList, uploadImageFile } from "../../../services/community/media";
import { themeColors } from "../../../variables/colors";
import { CommunityStackScreenProps } from "../../../variables/navigation";
import { TagType } from "../../../variables/types/community";
import { RootState } from "../../../store/store";

export default function PostCreate() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [snackbarText, setSnackbarText] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [tagChoices, setTagChoices] = useState<{}>();
  const [selectedForum, setSelectedForum] = useState<string>("덕아웃");
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [uploadedImages, setUploadedImages] = useState<MyImageAsset[]>([]);

  const user = useSelector((state: RootState) => state.auth.user);
  const navigation =
    useNavigation<CommunityStackScreenProps<"PostCreate">["navigation"]>();

  useEffect(() => {
    const fetchTags = async () => {
      const response = await getTagsList();

      if (response.status === 200) {
        setTagChoices(response.data);
      }
    };

    fetchTags();
  }, []);

  const handleCreatePost = () => {
    // TODO: API 연동
    // + setSelectedPost to new post
    navigation.navigate("CommunityScreen"); // 새로운 글의 PostDetail로 바로 이동
  };

  const handleTagSelect = (tag: TagType) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length >= 3) {
        setSnackbarText("태그는 최대 3개까지 선택할 수 있습니다.");
        setVisible(true);
        return;
      }
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const renderTags = () => {
    if (tagChoices) {
      return tagChoices[selectedForum].map((tag: TagType) => (
        <TouchableOpacity key={tag.name} onPress={() => handleTagSelect(tag)}>
          <Tag tag={tag} active={selectedTags.includes(tag)} />
        </TouchableOpacity>
      ));
    }
  };

  const handleForumSelect = (forum: string) => {
    setSelectedForum(forum);
    setSelectedTags([]);
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

    if (
      uploadedImages.some((img) => img.asset.fileName === imageAsset.fileName)
    ) {
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
      setUploadedImages((prev) => [...prev, { id, url, asset: imageAsset }]);

      const newContent =
        content +
        `\n![업로드${uploadedImages.length + 1}](${imageAsset.fileName})`;
      setContent(newContent);
    }
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
        <Text style={styles.subtitle}>
          태그
          <Text style={styles.helperText}>{`\t ${selectedTags.length}/3`}</Text>
        </Text>
        <View style={styles.selectedTags}>{renderTags()}</View>
        <Divider style={styles.divider} />
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
        />
        {uploadedImages.length > 0 && (
          <>
            <Divider style={styles.divider} />
            <Text style={styles.subtitle}>포함된 이미지</Text>
            {uploadedImages.map((image) => (
              <View style={styles.box} key={image.url}>
                <Icon source="image" size={24} color="green" />
                <Text variant="titleMedium" style={styles.text}>
                  {image.asset.fileName}
                </Text>
              </View>
            ))}
          </>
        )}
        <Divider style={styles.divider} />
        <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
          <Text style={styles.buttonText}>등록</Text>
        </TouchableOpacity>
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
  selectedTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  helperText: {
    color: "gray",
    fontSize: 14,
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
  divider: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
