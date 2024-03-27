import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Text, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { CommentSimple } from "../CommentSimple";
import { ErrorPage } from ".components/Error";
import { LoadingPage } from ".components/Loading";
import { ScrollView } from ".components/ScrollView";
import { CommentScreenProps } from ".constants/navigation";
import { createComment, getCommentList } from ".services/community";
import { RootState } from ".store/index";
import { CommentSimpleType } from ".types/community";

export default function CommentList() {
  const [newComment, setNewComment] = useState<string>("");
  const [numComments, setNumComments] = useState<number>(0);
  const [comments, setComments] = useState<CommentSimpleType[]>([]);

  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const selectedPostId = useSelector(
    (state: RootState) => state.community.selectedPostId
  );
  const navigation =
    useNavigation<CommentScreenProps<"CommentList">["navigation"]>();

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };

  const handlePostComment = async () => {
    const response = await createComment(
      selectedPostId,
      newComment,
      user.uuid,
      token
    );

    if (response.status === 201) {
      handleRefresh();
      setNewComment("");
    }
  };

  const LeftHeader = () => (
    <Text
      style={styles.header}
      variant="titleMedium"
    >{`댓글 ${numComments}`}</Text>
  );

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const response = await getCommentList(selectedPostId, token);

      if (response.status === 200) {
        setComments(response.data.comments);
        setNumComments(response.data.num_comments);
        setError(false);
      } else {
        setError(true);
      }

      setLoading(false);
    };

    fetchComments();
  }, [refreshCount]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <LeftHeader />,
    });
  }, [numComments]);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage onRefresh={handleRefresh} />;

  return (
    <ScrollView refreshing={loading} onRefresh={handleRefresh}>
      <View style={styles.comments}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="댓글 쓰기"
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="transparent"
          contentStyle={styles.textinput}
          dense
          right={
            newComment ? (
              <TextInput.Icon icon="send" onPress={handlePostComment} />
            ) : null
          }
          testID="comment-input"
        />
        <Divider style={styles.divider} />
        {comments.map((comment) => (
          <CommentSimple key={comment.id} initialComment={comment} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginLeft: 20,
  },
  comments: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  divider: {
    marginVertical: 5,
  },
  textinput: {
    backgroundColor: "white",
    borderRadius: 20,
  },
});
