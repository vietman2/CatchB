import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";

import { themeColors } from "../../variables/colors";
import { UserProfileType } from "../../variables/types/users";
import { PostType } from "../../variables/types/community";

interface ProfileProps {
  user: UserProfileType | null;
}

export function MainProfile({user}: Readonly<ProfileProps>) {
  return (
    <View style={styles.container}>
      <Avatar.Icon
        size={80}
        icon="account"
        style={{ backgroundColor: themeColors.primary }}
      />
      <View style={styles.textBox}>
        <Text variant="titleMedium" style={{ color: "gray" }}>
          {user === null
            ? "로그인 후 편하게 서비스를 이용하세요!"
            : "일반 회원"}
        </Text>
        <Text variant="headlineSmall" style={styles.profileText}>
          {user === null ? "로그인" : user.full_name}
        </Text>
      </View>
    </View>
  );
}

interface PostProps {
  post: PostType;
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
          {post.author_name}
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

interface ImageProps {
  profileImage?: string;
}

export function AvatarImage({ profileImage }: Readonly<ImageProps>) {
  if (profileImage) {
    return (
      <Avatar.Image
        size={64}
        source={{ uri: profileImage }}
        style={styles.avatar}
      />
    );
  }
  return <Avatar.Icon size={64} icon="account" style={styles.avatar} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textBox: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-evenly",
  },
  profileText: {
    fontFamily: "Catch B ExtraBold",
    color: themeColors.primary,
  },
  avatar: {
    marginVertical: 16,
    backgroundColor: themeColors.secondaryContainer,
  },
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
  detailsLine: {
    flexDirection: "row",
    marginTop: 5,
  },
  stats: {
    flexDirection: "row",
  },
});
