import { useRef, useMemo, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

import { CommunityPostProfile } from "../../../components/Profile";
import { RootState } from "../../../store/store";
import { themeColors } from ".themes/colors";
import { PostType } from ".types/community";
import { LoadingPage } from "../../../components/Loading";
import { getPostDetail } from "../../../services/community/post";
import ErrorPage from "../../../containers/Base/ErrorPage";

export default function PostDetail() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "50%", "100%"], []);
  const [post, setPost] = useState<PostType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const postId = useSelector(
    (state: RootState) => state.community.selectedPostId
  );
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostDetail(postId, token);

        if (response.status === 200) {
          setPost(response.data);
        } else {
          setError(true);
        }
      } catch (error) {
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
        <CommunityPostProfile post={post} />
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
        backgroundStyle={{ backgroundColor: "rgb(250, 250, 250)" }}
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
});
