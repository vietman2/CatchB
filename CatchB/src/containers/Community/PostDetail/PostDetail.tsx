import { useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Text, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

import { CommentSimple, PostHeader } from "../fragments";
import { CommunityButton } from ".components/Buttons";
import { ErrorPage } from ".components/Error";
import { LoadingPage } from ".components/Loading";
import { ScrollView } from ".components/ScrollView";
import {
  createComment,
  getPostDetail,
  postLike,
  postDislike,
} from ".services/community";
import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";
import { PostDetailType } from ".types/community";

export default function PostDetail() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "50%", "100%"], []);
  const [post, setPost] = useState<PostDetailType>();
  const [newComment, setNewComment] = useState<string>("");

  const [refreshCount, setRefreshCount] = useState<number>(0);
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
      handleRefresh();
      setNewComment("");
    }
  };

  const handleLike = async () => {
    const response = await postLike(postId, user.uuid, token);

    if (response.status === 200) {
      setPost(response.data);
    }
  };

  const handleDislike = async () => {
    const response = await postDislike(postId, user.uuid, token);

    if (response.status === 200) {
      setPost(response.data);
    }
  };

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPostDetail(postId, token);

      if (response.status === 200) {
        setPost(response.data);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchPost();
  }, [refreshCount]);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage onRefresh={handleRefresh} />;

  return (
    <>
      <ScrollView refreshing={loading} onRefresh={handleRefresh}>
        <View style={styles.container}>
          <PostHeader post={post} />
          <Divider style={styles.divider} />
          <Text variant="titleMedium" style={styles.body}>
            {post.content}
          </Text>
          <Divider style={styles.divider} />
          <View style={styles.interactions}>
            <CommunityButton
              mode="like"
              number={post.num_likes}
              state={post.is_liked}
              action={handleLike}
            />
            <CommunityButton
              mode="dislike"
              number={post.num_dislikes}
              state={post.is_disliked}
              action={handleDislike}
            />
            <CommunityButton mode="report" state={false} action={() => {}} />
          </View>
          <Divider style={styles.divider} />
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
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
            testID="comment-input"
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
  body: {
    marginVertical: 10,
  },
  interactions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
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
