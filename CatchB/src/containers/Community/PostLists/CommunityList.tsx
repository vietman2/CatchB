import { useRef, useState, useMemo, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { Chip, Divider, Icon, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";

import { PostSimple } from "../fragments";
import { AppDispatch } from "../../../store/store";
import { setSelectedPost } from "../../../store/slices/community/postSlice";
import { themeColors } from ".themes/colors";
import { PostSimpleType } from ".types/community";
import { CommunityScreenProps } from ".constants/navigation";
import { getPostList } from "../../../services/community/post";

interface Props {
  mode: "덕아웃" | "드래프트";
}

type Sort = "최신순" | "인기순" | "조회 많은 순" | "댓글 많은 순";

export function CommunityList({ mode }: Readonly<Props>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<PostSimpleType[]>([]);
  const [sort, setSort] = useState<Sort>("최신순");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["1%", "45%"], []);
  const navigation =
    useNavigation<CommunityScreenProps<"PostDetail">["navigation"]>();
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = async (post: PostSimpleType) => {
    await dispatch(setSelectedPost(post.id));
    navigation.navigate("PostDetail");
  };

  const handleSortChoice = (choice: Sort) => {
    setSort(choice);
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPostList(mode);

      if (response.status === 200) {
        setPosts(response.data);
      }
    };

    fetchPosts();
  }, []);

  const SortComponent = ({ choice }: Readonly<{ choice: Sort }>) => {
    return (
      <TouchableOpacity
        onPress={() => handleSortChoice(choice)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
        testID="sortChoice"
      >
        <Text
          variant="titleLarge"
          style={sort === choice ? styles.selectedChoice : styles.sortChoices}
        >
          {choice}
        </Text>
        {sort === choice && (
          <Icon source="check" size={24} color={themeColors.primary} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Keyboard.dismiss}
        scrollEventThrottle={16}
      >
        <TextInput
          mode="outlined"
          placeholder="제목, 내용으로 검색하세요."
          onChangeText={setSearchQuery}
          value={searchQuery}
          left={<TextInput.Icon icon="magnify" />}
          outlineStyle={styles.searchBar}
        />
        <View style={styles.filters}>
          <TouchableOpacity
            onPress={handleOpenBottomSheet}
            testID="sort-button"
          >
            <Chip
              compact
              icon="sort"
              selectedColor="green"
              style={{ backgroundColor: "rgba(64, 196, 20, 0.25)" }}
            >
              {sort}
            </Chip>
          </TouchableOpacity>
          <TouchableOpacity>
            <Chip
              compact
              icon="filter-variant"
              selectedColor="green"
              style={{
                backgroundColor: "rgba(64, 196, 20, 0.25)",
                marginLeft: 10,
              }}
            >
              전체
            </Chip>
          </TouchableOpacity>
          {mode === "드래프트" ? (
            <TouchableOpacity>
              <Chip
                compact
                icon="check-circle-outline"
                selectedColor="green"
                style={{
                  backgroundColor: "rgba(64, 196, 20, 0.25)",
                  marginLeft: 10,
                }}
              >
                우리동네만 보기
              </Chip>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        {posts.map((post) => (
          <View key={post.id}>
            <TouchableOpacity
              onPress={() => handlePress(post)}
              testID={`post-id-${post.id}`}
            >
              <PostSimple post={post} />
            </TouchableOpacity>
            <Divider />
          </View>
        ))}
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
      >
        <View style={styles.bottomSheet}>
          <View style={styles.texts}>
            <Text variant="headlineSmall" style={styles.title}>
              정렬
            </Text>
            <SortComponent choice="최신순" />
            <SortComponent choice="인기순" />
            <SortComponent choice="조회 많은 순" />
            <SortComponent choice="댓글 많은 순" />
          </View>
          <TouchableOpacity
            style={styles.close}
            onPress={handleCloseBottomSheet}
            testID="close"
          >
            <Text variant="headlineSmall">닫기</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
  },
  searchBar: {
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 0,
  },
  filters: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
  },
  bottomSheet: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  close: {
    alignItems: "center",
  },
  texts: {
    marginHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    color: themeColors.primary,
    fontFamily: "Catch B ExtraBold",
  },
  selectedChoice: {
    marginTop: 15,
    color: themeColors.primary,
    fontWeight: "bold",
  },
  sortChoices: {
    marginTop: 15,
  },
});
