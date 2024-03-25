import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { CommentSimpleType } from ".constants/types/community";

interface Props {
  comment: CommentSimpleType;
}

export default function CommentSimple({ comment }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nickname}>
          {"작성자 닉네임" /*TODO: comment.commenter_nickname*/}
        </Text>
        <Text style={styles.date}>{comment.created_at}</Text>
      </View>
      <Text style={styles.content}>{comment.content}</Text>
      <View style={styles.footer}>
        <Text style={styles.likes}>{comment.num_likes}개</Text>
        <Text style={styles.recomments}>{comment.num_recomments}개</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nickname: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
  content: {
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
  },
  likes: {
    fontSize: 12,
    color: "gray",
  },
  recomments: {
    fontSize: 12,
    color: "gray",
  },
});
