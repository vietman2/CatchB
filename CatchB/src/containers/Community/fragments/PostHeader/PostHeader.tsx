import { StyleSheet, View } from "react-native";
import { Avatar, Icon, Text } from "react-native-paper";

import { Tag } from "../fragments";
import { PostDetailType } from ".types/community";

interface PostProps {
  post: PostDetailType;
  simple?: boolean;
}

export default function PostHeader({ post, simple }: Readonly<PostProps>) {
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
    <>
      <View style={styles.tags}>
        {post.tags.map((tag) => (
          <Tag key={tag.id} tag={tag} active />
        ))}
      </View>
      <Text variant="headlineSmall" style={styles.title}>
        {post.title}
      </Text>
      <View style={styles.horizontal}>
        <View style={styles.profile}>
          <Avatar.Icon
            size={28}
            icon="account"
            style={styles.icon}
            color="white"
          />
          <Text variant="titleMedium" style={styles.name}>
            {"글쓴이" /*TODO: post.author_nickname*/}
          </Text>
          <Text variant="titleSmall">{renderCreatedAt()}</Text>
        </View>
        {!simple && (
          <View style={styles.views}>
            <Icon source="eye" size={20} color="gray" />
            <Text style={styles.viewText}>{post.num_clicks}</Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  title: {
    flexWrap: "wrap",
    fontWeight: "bold",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
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
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  views: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewText: {
    color: "gray",
    marginLeft: 5,
  },
});
