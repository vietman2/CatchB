import { StyleSheet, View } from "react-native";
import { Chip, Text } from "react-native-paper";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/store";
import { themeColors } from "../../../variables/colors";

export default function PostDetail() {
  const post = useSelector((state: RootState) => state.community.selectedPost)

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Chip icon="account" style={{ marginTop: 10, marginRight: 10 }} compact>
          {post.author_name}
        </Chip>
        <Text variant="headlineMedium" style={styles.title}>
          {post.title}
        </Text>
      </View>
      <Text variant="titleMedium" style={styles.body}>
        {post.body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
    marginTop: 10,
  },
  body: {
    marginTop: 10,
  },
});
