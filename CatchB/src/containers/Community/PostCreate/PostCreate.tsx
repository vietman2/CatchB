import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Menu, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import MenuWithIcon from "../../../components/Menus/MenuWithIcon";
import { themeColors } from "../../../variables/colors";
import { CommunityStackScreenProps } from "../../../variables/navigation";

export default function PostCreate() {
  const [forumMenuVisible, setForumMenuVisible] = useState(false);
  const [subforumMenuVisible, setSubforumMenuVisible] = useState(false);
  const navigation =
    useNavigation<CommunityStackScreenProps<"PostCreate">["navigation"]>();

  const openForumMenu = () => setForumMenuVisible(true);
  const closeForumMenu = () => setForumMenuVisible(false);
  const openSubforumMenu = () => setSubforumMenuVisible(true);
  const closeSubforumMenu = () => setSubforumMenuVisible(false);

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
    console.log("Create Post");
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Menu
          visible={forumMenuVisible}
          onDismiss={closeForumMenu}
          anchor={<MenuWithIcon text="선택" openMenu={openForumMenu} />}
          anchorPosition="bottom"
        >
          <Menu.Item dense onPress={() => {}} title="Item 1" />
          <Menu.Item dense onPress={() => {}} title="Item 2" />
        </Menu>
        <Menu
          visible={subforumMenuVisible}
          onDismiss={closeSubforumMenu}
          anchor={<MenuWithIcon text="선택" openMenu={openSubforumMenu} />}
          anchorPosition="bottom"
        >
          <Menu.Item dense onPress={() => {}} title="Item 1" />
        </Menu>
      </View>
      <TextInput placeholder="제목을 입력해주세요 (최대 50자)" mode="outlined" style={{ marginTop: 20 }} />
      <TextInput
        placeholder={"내용을 입력해주세요. (최소 20자 ~ 최대 1000자)\n사진은 최대 5장 올릴 수 있어요."}
        mode="outlined"
        style={{ marginTop: 20 }}
        multiline
        numberOfLines={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
  },
  button: {
    marginRight: 15,
  },
  buttonText: {
    color: themeColors.primary,
    fontWeight: "bold",
  },
});
