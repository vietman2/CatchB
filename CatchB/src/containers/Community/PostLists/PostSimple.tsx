import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Chip, Icon, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { PostType } from "../../../variables/types/community";
import { themeColors } from "../../../variables/colors";
import { CommunityStackScreenProps } from "../../../variables/navigation";
import { AppDispatch } from "../../../store/store";
import { setSelectedPost } from "../../../store/slices/community/communitySlice";

interface Props {
  post: PostType;
}

export default function PostSimple({ post }: Readonly<Props>) {
  const navigation =
    useNavigation<CommunityStackScreenProps<"PostDetail">["navigation"]>();
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = async () => {
    await dispatch(setSelectedPost(post));
    navigation.navigate("PostDetail");
  };

  const renderPostBody = () => {
    if (post.body.length > 100) {
      return post.body.slice(0, 100) + "...";
    }
    return post.body;
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Chip compact mode="flat">
          경기모집
        </Chip>
        <Text variant="titleLarge" style={styles.title}>
          {post.title}
        </Text>
        <Text variant="titleMedium">{renderPostBody()}</Text>
        <Text style={styles.infoText}>{post.author_name}</Text>
        <View style={styles.extraInfo}>
          <View style={styles.inner}>
            <Text style={styles.infoText}>
              <Icon source="pencil" size={18} color={themeColors.primary} />{" "}
              {post.created_at}
            </Text>
            <Text style={styles.countText}>
              <Icon source="eye" size={18} color={themeColors.primary} />{" "}
              {post.num_clicks}
            </Text>
          </View>
          <View style={styles.inner}>
            <Text style={styles.countText}>
              <Icon source="heart" size={18} color={themeColors.primary} />{" "}
              {post.num_likes}
            </Text>
            <Text style={styles.countText}>
              <Icon source="chat" size={18} color={themeColors.primary} />{" "}
              {post.num_comments}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    alignItems: "flex-start",
  },
  title: {
    marginVertical: 5,
    fontWeight: "bold",
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  inner: {
    flexDirection: "row",
    marginRight: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  infoText: {
    color: "gray",
  },
  countText: {
    color: "gray",
    marginLeft: 15,
  },
});
