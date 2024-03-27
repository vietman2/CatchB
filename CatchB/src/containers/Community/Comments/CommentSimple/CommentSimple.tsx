import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { CommentScreenProps } from ".constants/navigation";
import { commentLike, commentDislike } from ".services/community";
import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";
import { CommentSimpleType } from ".types/community";

interface Props {
  initialComment: CommentSimpleType;
  simple?: boolean;
}

export default function CommentSimple({
  initialComment,
  simple,
}: Readonly<Props>) {
  const [comment, setComment] = useState<CommentSimpleType>(initialComment);

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigation =
    useNavigation<CommentScreenProps<"CommentList">["navigation"]>();

  const handleLike = async () => {
    const response = await commentLike(comment.id, user.uuid, token);

    if (response.status === 200) {
      setComment(response.data);
    }
  };

  const handleDislike = async () => {
    const response = await commentDislike(comment.id, user.uuid, token);

    if (response.status === 200) {
      setComment(response.data);
    }
  };

  const handleReport = () => {
    navigation.navigate("CommunityReport", {
      type: "comment",
      comment: comment,
    });
  };

  const getIconSource = (state: boolean, type: 1 | 2) => {
    if (state) {
      return type === 1 ? "heart" : "emoticon-cry";
    } else {
      return type === 1 ? "heart-outline" : "emoticon-cry-outline";
    }
  };

  return (
    <>
      <View>
        <View style={styles.container}>
          <View style={styles.horizontal}>
            <Text variant="bodyMedium" style={styles.headerText}>
              {`작성자 닉네임\t${comment.created_at}`}
              {/*TODO: comment.commenter_nickname*/}
            </Text>
          </View>
          <View style={styles.content}>
            <Text variant="titleMedium">{comment.content}</Text>
          </View>
          {!simple && (
            <View style={styles.horizontal}>
              <TouchableOpacity
                style={styles.number}
                onPress={handleLike}
                testID="like"
              >
                <Icon
                  source={getIconSource(comment.is_liked, 1)}
                  size={14}
                  color={themeColors.primary}
                />
                <Text style={styles.numberText}>{comment.num_likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.number}
                onPress={handleDislike}
                testID="dislike"
              >
                <Icon
                  source={getIconSource(comment.is_disliked, 2)}
                  size={14}
                  color={themeColors.primary}
                />
                <Text style={styles.numberText}>{comment.num_dislikes}</Text>
              </TouchableOpacity>
              <View style={styles.number}>
                <Icon
                  source="comment-text-outline"
                  size={14}
                  color={themeColors.primary}
                />
                <Text style={styles.numberText}>{comment.num_recomments}</Text>
              </View>
              <TouchableOpacity
                style={styles.number}
                onPress={handleReport}
                testID="report"
              >
                <Icon
                  source="flag-outline"
                  size={14}
                  color={themeColors.primary}
                />
                <Text style={styles.numberText}>신고하기</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Divider style={styles.divider} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  horizontal: {
    flexDirection: "row",
  },
  headerText: {
    color: "gray",
  },
  number: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  numberText: {
    marginLeft: 2.5,
    color: "gray",
    fontSize: 14,
  },
  content: {
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 5,
  },
  divider: {
    marginVertical: 5,
  },
  button: {
    marginLeft: 15,
  },
  buttonText: {
    color: themeColors.primary,
    fontWeight: "bold",
  },
});
