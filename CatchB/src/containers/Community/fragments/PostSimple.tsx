import { View, StyleSheet } from "react-native";
import { Avatar, Chip, Icon, Text } from "react-native-paper";

import { PostType } from ".types/community";
import { themeColors } from "../../../variables/colors";

interface Props {
  post: PostType;
}

export default function PostSimple({ post }: Readonly<Props>) {
  const renderPostBody = () => {
    if (post.body.length > 25) {
      return post.body.slice(0, 25) + "...";
    }
    return post.body;
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
      date.getDate() < 10 
        ? "0" + date.getDate() 
        : date.getDate();

    return date.getFullYear() + "-" + monthText + "-" + dateText;
  };

  return (
    <View style={styles.container}>
      <Chip compact mode="flat">
        {post.tags[0]}
      </Chip>
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
              {post.author_name}
            </Text>
            <Text variant="titleSmall" style={styles.countText}>
              {renderCreatedAt()}
            </Text>
          </View>
        </View>
        <View style={styles.inner}>
          <Text style={styles.countText}>
            <Icon source="eye" size={18} color={themeColors.primary} />{" "}
            {post.num_clicks}
          </Text>
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
});
