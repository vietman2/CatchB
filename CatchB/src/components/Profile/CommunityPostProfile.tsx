import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

import { PostDetailType } from ".types/community";

interface PostProps {
  post: PostDetailType;
}

export function CommunityPostProfile({ post }: Readonly<PostProps>) {
  const renderCreatedAt = () => {
    // MM/DD HH:MM
    const date = new Date(post.created_at);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const monthStr = month < 10 ? `0${month}` : `${month}`;
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${monthStr}/${dayStr} ${hoursStr}:${minutesStr}`;
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.profile}>
        <Avatar.Icon
          size={28}
          icon="account"
          style={styles.icon}
          color="white"
        />
        <Text variant="titleMedium" style={styles.name}>
          {post.author_nickname}
        </Text>
        <Text variant="titleSmall">{renderCreatedAt()}</Text>
      </View>
      <View style={styles.stats}>
        <Text variant="titleSmall">조회수: {post.num_clicks}</Text>
        <Text variant="titleSmall"> 좋아요: {post.num_likes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    color: "blue",
    textAlign: "center",
    marginRight: 10,
  },
  icon: {
    backgroundColor: "gray",
    marginRight: 7.5,
  },
  stats: {
    flexDirection: "row",
  },
});
