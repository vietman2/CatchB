import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

import PostSimple from "./PostSimple";
import { samplePosts } from "../../../variables/mvp_dummy_data/posts";
import { PostType } from "../../../variables/types/community";
import { themeColors } from "../../../variables/colors";

export default function RecruitList() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    // TODO: Integrate API
    setPosts(samplePosts);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {posts.map((post, index) => (
          <View key={index}>
            <PostSimple post={post} />
            <Divider />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
  },
});
