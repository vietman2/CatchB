import { useEffect, useRef, useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";

import { themeColors } from "../../../variables/colors";
import { CommunityStackScreenProps } from "../../../variables/navigation";

type Forums = "야구톡" | "모집" | "벼룩시장" | "자세 분석";
const forums: Forums[] = ["야구톡", "모집", "벼룩시장", "자세 분석"];

export default function PostCreate() {
  const forumBottomSheetRef = useRef<BottomSheet>(null);
  const tagBottomSheetRef = useRef<BottomSheet>(null);
  const forumPickerSnapPoints = useMemo(() => ["35%"], []);
  const tagPickerSnapPoints = useMemo(() => ["60%"], []);
  const [selectedForum, setSelectedForum] = useState<Forums>("야구톡");
  //const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
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

  const handleForumSelect = (forum: Forums) => {
    setSelectedForum(forum);
    forumBottomSheetRef.current?.close();
  };

  const handleForumPickerOpen = () => {
    forumBottomSheetRef.current?.expand();
  };

  const handleTagPickerOpen = () => {
    tagBottomSheetRef.current?.expand();
  };
  /*
  const handleTagPickerClose = () => {
    tagBottomSheetRef.current?.close();
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };*/

  function SelectedForum({ forum }: Readonly<{ forum: Forums }>) {
    return (
      <TouchableOpacity
        onPress={() => handleForumSelect(forum)}
        style={styles.option}
        testID="selected-forum"
      >
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          {forum}
        </Text>
        <Icon source="check" size={24} color="green" />
      </TouchableOpacity>
    );
  }

  function UnselectedForum({ forum }: Readonly<{ forum: Forums }>) {
    return (
      <TouchableOpacity
        onPress={() => handleForumSelect(forum)}
        style={styles.option}
      >
        <Text variant="titleLarge">{forum}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode="on-drag"
      >
        <View style={styles.pickers}>
          <TouchableOpacity
            onPress={handleForumPickerOpen}
            style={styles.button}
            testID="forum-picker"
          >
            <View style={styles.chip}>
              <Text style={styles.chipText}>{selectedForum}</Text>
              <Icon source="chevron-down" size={18} />
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text>태그</Text>
          </View>
          <TouchableOpacity
            onPress={handleTagPickerOpen}
            style={styles.button}
            testID="tag-picker"
          >
            <Text>선택{/*selectedTags.length === 0 ? "선택" : "변경"*/}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          label="제목"
          mode="outlined"
          value={title}
          onChangeText={setTitle}
          right={
            <TextInput.Affix
              text={`${title.length}/50`}
              textStyle={{ fontSize: 14, color: "gray" }}
            />
          }
          dense
          error={title.length > 50}
          style={styles.textInput}
        />
        <TextInput
          label="내용"
          mode="outlined"
          value={content}
          onChangeText={setContent}
          right={
            <TextInput.Affix
              text={`${content.length}/1000`}
              textStyle={{ fontSize: 14, color: "gray" }}
            />
          }
          dense
          error={content.length > 1000}
          style={[styles.textInput, { height: 360 }]}
          multiline
        />
      </ScrollView>
      <BottomSheet
        ref={forumBottomSheetRef}
        index={-1}
        snapPoints={forumPickerSnapPoints}
        backgroundStyle={styles.bottomSheet}
      >
        <View style={styles.forumPicker}>
          <Text variant="titleLarge" style={styles.forumTitle}>
            게시판 선택
          </Text>
          {forums.map((forum) => {
            return selectedForum === forum ? (
              <SelectedForum key={forum} forum={forum} />
            ) : (
              <UnselectedForum key={forum} forum={forum} />
            );
          })}
        </View>
      </BottomSheet>
      <BottomSheet
        ref={tagBottomSheetRef}
        index={-1}
        snapPoints={tagPickerSnapPoints}
        backgroundStyle={styles.bottomSheet}
      >
        <View style={styles.forumPicker}>
          <Text variant="titleLarge" style={styles.forumTitle}>
            태그 선택
          </Text>
          <Text variant="titleLarge">태그 선택</Text>
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
  },
  pickers: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    marginRight: 15,
  },
  buttonText: {
    color: themeColors.primary,
    fontWeight: "bold",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "silver",
    marginRight: 10,
    borderRadius: 7.5,
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 5,
  },
  chipText: {
    fontWeight: "bold",
    marginRight: 2,
  },
  bottomSheet: {
    backgroundColor: "rgb(245, 245, 245)",
  },
  forumPicker: {
    alignItems: "center",
  },
  forumTitle: {
    fontWeight: "bold",
    fontFamily: "Catch B Bold",
    color: themeColors.primary,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginTop: 10,
  },
  textInput: {
    marginTop: 20,
    backgroundColor: "white",
  },
});
