import { useRef, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

import PostTagChip from "../../../components/Chips/PostTagChip";
import PostAuthorProfile from "../../../components/Profile/PostAuthorProfile";
import { RootState } from "../../../store/store";
import { themeColors } from "../../../variables/colors";

export default function PostDetail() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "50%", "100%"], []);
  const post = useSelector((state: RootState) => state.community.selectedPost);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.tags}>
          <PostTagChip label="일반" />
        </View>
        <Text variant="headlineSmall" style={styles.title}>
          {post.title}
        </Text>
        <PostAuthorProfile post={post} />
        <Divider />
        <Text variant="titleMedium" style={styles.body}>
          {post.body}
        </Text>
        <Divider />
        <View style={styles.interactions}>
          <Text variant="titleSmall">공감하기</Text>
          <Text variant="titleSmall">신고하기</Text>
        </View>
        <Divider />
      </ScrollView>
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} backgroundStyle={{backgroundColor: "rgb(250, 250, 250)"}}>
        <View style={styles.comments}>
          <Text variant="titleMedium" style={styles.commentTitle}>댓글 {post.num_comments}</Text>
          <Divider />
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
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  title: {
    flexWrap: "wrap",
    fontWeight: "bold",
    marginTop: 10,
  },
  body: {
    marginVertical: 10,
  },
  interactions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 80,
  },
  comments: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  commentTitle: {
    marginBottom: 10,
  },
});
