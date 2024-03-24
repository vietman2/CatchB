import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { SvgCssUri } from "react-native-svg";

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
}: Props) {
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

interface TagProps {
  tag?: TagType;
  active?: boolean;
  blank?: boolean;
}

export function Tag({ tag, active, blank }: Readonly<TagProps>) {
  if (blank)
    return <Chip label="선택하기" backgroundColor="gray" color="white" />;

  return (
    <Chip
      label={tag.name}
      backgroundColor={tag.bgcolor}
      color={tag.color}
      icon={tag.icon}
      active={active}
    />
  );
}

interface ChipProps {
  icon?: string;
  label: string;
  color: string;
  backgroundColor: string;
  active?: boolean;
}

export function Chip({
  icon,
  label,
  color,
  backgroundColor,
  active,
}: Readonly<ChipProps>) {
  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: active ? backgroundColor : "silver",
          opacity: active ? 1 : 0.5,
        },
      ]}
    >
      {icon === undefined ? null : (
        <SvgCssUri
          width={16}
          height={16}
          uri={icon}
          style={styles.svg}
          fillOpacity={active ? 1 : 0.25}
        />
      )}
      <Text style={{ color }}>{label}</Text>
    </View>
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
  chip: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  svg: {
    marginRight: 5,
  },
});
