import { useRef, useMemo, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, Text, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

import { CommentSimple, PostHeader } from "../fragments";
import { ErrorPage } from ".components/Error";
import { LoadingPage } from ".components/Loading";
import { createComment, getPostDetail } from ".services/community";
import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";
import { PostDetailType } from ".types/community";

export default function PostDetail() {
  const [newComment, setNewComment] = useState<string>("");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "50%", "100%"], []);
  const [post, setPost] = useState<PostDetailType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const postId = useSelector(
    (state: RootState) => state.community.selectedPostId
  );

  const handleComment = async () => {
    const response = await createComment(postId, newComment, user.uuid, token);

    if (response.status === 201) {
      setPost((prevPost) => {
        if (prevPost) {
          return {
            ...prevPost,
            num_comments: prevPost.num_comments + 1,
          };
        }
        return prevPost;
      });
      setNewComment("");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPostDetail(postId, token);

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
        <PostHeader post={post} />
        <Divider style={styles.divider} />
        <Text variant="titleMedium" style={styles.body}>
          {post.content}
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.interactions}>
          <Text variant="titleSmall">공감하기</Text>
          <Text variant="titleSmall">신고하기</Text>
        </View>
        <Divider style={styles.divider} />
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.sheetBackground}
      >
        <View style={styles.comments}>
          <Text variant="titleMedium">댓글 {post.num_comments}</Text>
          <Divider style={styles.divider} />
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="댓글 쓰기"
            mode="outlined"
            outlineColor="transparent"
            dense
            right={
              newComment ? (
                <TextInput.Icon icon="send" onPress={handleComment} />
              ) : null
            }
          />
          <Divider style={styles.divider} />
          {post.comments.map((comment) => (
            <CommentSimple key={comment.id} comment={comment} />
          ))}
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
  sheetBackground: {
    backgroundColor: "rgb(250, 250, 250)",
  },
  divider: {
    marginVertical: 5,
  },
});
