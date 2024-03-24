import { useRef, useMemo, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

import { ErrorPage } from ".components/Error";
import { LoadingPage } from ".components/Loading";
import { CommunityProfile } from ".components/Profile";
import { getPostDetail } from ".services/community";
import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";
import { PostDetailType } from ".types/community";

export default function PostDetail() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "50%", "100%"], []);
  const [post, setPost] = useState<PostDetailType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const postId = useSelector(
    (state: RootState) => state.community.selectedPostId
  );

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPostDetail(postId);

      if (response.status === 200) {
        setPost(response.data);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchPost();
  }, []);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <>
      <ScrollView style={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>
          {post.title}
        </Text>
        <CommunityProfile post={post} />
        <Divider />
        <Text variant="titleMedium" style={styles.body}>
          {post.content}
        </Text>
        <Divider />
        <View style={styles.interactions}>
          <Text variant="titleSmall">공감하기</Text>
          <Text variant="titleSmall">신고하기</Text>
        </View>
        <Divider />
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.sheetBackground}
      >
        <View style={styles.comments}>
          <Text variant="titleMedium" style={styles.commentTitle}>
            댓글 {post.num_comments}
          </Text>
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
  sheetBackground: {
    backgroundColor: "rgb(250, 250, 250)",
  },
});
