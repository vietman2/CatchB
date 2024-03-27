import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { Tag } from "../fragments";
import { TagType } from ".types/community";

interface Props {
  selectedForum: string;
  selectedTags: TagType[];
  setSelectedTags: Dispatch<SetStateAction<TagType[]>>;
  setSnackbarText: Dispatch<SetStateAction<string>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  tagChoices: Record<string, TagType[]>;
}

export default function Tags({
  selectedForum,
  selectedTags,
  setSelectedTags,
  setSnackbarText,
  setVisible,
  tagChoices,
}: Readonly<Props>) {
  const renderTags = () => {
    return tagChoices[selectedForum].map((tag: TagType) => (
      <TouchableOpacity key={tag.name} onPress={() => handleTagSelect(tag)}>
        <Tag tag={tag} active={selectedTags.includes(tag)} />
      </TouchableOpacity>
    ));
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

  return (
    <>
      <Text style={styles.subtitle}>
        태그
        <Text style={styles.helperText}>{`\t ${selectedTags.length}/3`}</Text>
      </Text>
      <View style={styles.selectedTags}>{renderTags()}</View>
    </>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginVertical: 5,
    paddingLeft: 10,
    fontSize: 18,
  },
  helperText: {
    color: "gray",
    fontSize: 14,
  },
  selectedTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
});
