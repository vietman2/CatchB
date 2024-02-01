import {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  ReactElement,
} from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { Chip, Divider, Icon, Text, TextInput } from "react-native-paper";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import PostSimple from "./PostSimple";
import { themeColors } from "../../../variables/colors";
import { samplePosts } from "../../../variables/mvp_dummy_data/posts";

interface Props {
  hideFAB: () => void;
  showFAB: () => void;
  mode: "야구톡" | "모집";
}

export default function CommunityList({ hideFAB, showFAB, mode }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState<
    "최신순" | "인기순" | "조회 많은 순" | "댓글 많은 순"
  >("최신순");
  const [BottomSheetComponents, setBottomSheetComponents] =
    useState<ReactElement>(<></>);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["1%", "45%"], []);
  const backDrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} pressBehavior="close" onPress={showFAB} />
    ),
    []
  );

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    showFAB();
  }, []);

  const handleSortChoice = (
    choice: "최신순" | "인기순" | "조회 많은 순" | "댓글 많은 순"
  ) => {
    setSort(choice);
    closeBottomSheet();
  };

  const openFilterChoices = () => {
    hideFAB();
    bottomSheetRef.current.snapToPosition("45%");
  };

  useEffect(() => {
    // samplePosts중에서 forum_id가 1인 것만 가져오기
    if (mode === "야구톡") {
      setPosts(samplePosts.filter((post) => post.forum_id === 1));
    } else if (mode === "모집") {
      setPosts(samplePosts.filter((post) => post.forum_id === 2));
    }
    setBottomSheetComponents(SortComponents);
  }, []);

  const SortComponents = () => {
    const SortComponent = ({
      choice,
    }: {
      choice: "최신순" | "인기순" | "조회 많은 순" | "댓글 많은 순";
    }) => {
      return (
        <TouchableOpacity
          onPress={() => handleSortChoice(choice)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
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
        <TouchableOpacity style={styles.close} onPress={closeBottomSheet}>
          <Text variant="headlineSmall">닫기</Text>
        </TouchableOpacity>
      </View>
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
          <TouchableOpacity onPress={openFilterChoices}>
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
          {mode === "모집" ? (
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
        {posts.map((post, index) => (
          <View key={index}>
            <PostSimple post={post} />
            <Divider />
          </View>
        ))}
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={backDrop}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
      >
        {BottomSheetComponents}
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