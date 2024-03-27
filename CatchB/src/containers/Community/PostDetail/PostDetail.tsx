import { useRef, useMemo, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";

import Comments from "../Comments";
import { PostHeader } from "../fragments";
import { CommunityButton } from ".components/Buttons";
import { ErrorPage } from ".components/Error";
import { LoadingPage } from ".components/Loading";
import { CommunityScreenProps } from ".constants/navigation";
import { getPostDetail, postLike, postDislike } from ".services/community";
import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";
import { PostDetailType } from ".types/community";

export default function PostDetail() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "50%", "100%"], []);
  const [post, setPost] = useState<PostDetailType>();

  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const postId = useSelector(
    (state: RootState) => state.community.selectedPostId
  );
  const navigation =
    useNavigation<CommunityScreenProps<"PostDetail">["navigation"]>();

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

  const handleReport = () => {
    navigation.navigate("CommunityReport", {
      type: "post",
      post: post,
    });
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
          <CommunityButton mode="report" state={false} action={handleReport} />
        </View>
        <Divider style={styles.divider} />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enableContentPanningGesture={false}
      >
        <Comments />
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
  divider: {
    marginVertical: 5,
  },
});
