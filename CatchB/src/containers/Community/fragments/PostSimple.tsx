import { View, StyleSheet } from "react-native";
import { Avatar, Icon, Text } from "react-native-paper";

import { Tag } from "./Tags";
import { themeColors } from ".themes/colors";
import { PostSimpleType } from ".types/community";

interface Props {
  post: PostSimpleType;
}

export default function PostSimple({ post }: Readonly<Props>) {
  const renderPostBody = () => {
    if (post.content.length > 25) {
      return post.content.slice(0, 25) + "...";
    }
    return post.content;
  };

  const renderCreatedAt = () => {
    const date = new Date(post.created_at);
    // if date is today, show time
    if (date.toDateString() === new Date().toDateString()) {
      return date.toLocaleTimeString();
    }
    // else show date: format yyyy-mm-dd
    // i said format yyyy-mm-dd

    const monthText =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const dateText =
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    return date.getFullYear() + "-" + monthText + "-" + dateText;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tags}>
        {post.tags.map((tag) => (
          <Tag key={tag.id} tag={tag} active />
        ))}
      </View>
      <Text variant="titleMedium" style={styles.title}>
        {post.title}
      </Text>
      <Text variant="titleSmall">{renderPostBody()}</Text>
      <View style={styles.extraInfo}>
        <View style={styles.inner}>
          <View style={styles.profile}>
            <Avatar.Icon
              size={16}
              icon="account"
              style={styles.icon}
              color="white"
            />
            <Text variant="titleMedium" style={styles.infoText}>
              {post.author_nickname}
            </Text>
            <Text variant="titleSmall" style={styles.countText}>
              {renderCreatedAt()}
            </Text>
          </View>
        </View>
        <View style={styles.inner}>
          <View style={styles.count}>
            <Icon source="eye" size={16} color={themeColors.primary} />
            <Text style={styles.countText}>{post.num_clicks}</Text>
          </View>
          <View style={styles.count}>
            <Icon source="heart" size={16} color={themeColors.primary} />
            <Text style={styles.countText}>{post.num_likes}</Text>
          </View>
          <View style={styles.count}>
            <Icon source="heart-broken" size={16} color={themeColors.primary} />
            <Text style={styles.countText}>{post.num_dislikes}</Text>
          </View>
          <View style={styles.count}>
            <Icon source="chat" size={16} color={themeColors.primary} />
            <Text style={styles.countText}>{post.num_comments}</Text>
          </View>
        </View>
      </View>
    </View>
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
  count: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 10,
  },
  countText: {
    color: "gray",
    marginLeft: 2.5,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    color: "blue",
    marginRight: 10,
  },
  icon: {
    backgroundColor: "gray",
    marginRight: 7.5,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
