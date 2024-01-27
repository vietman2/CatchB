import { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, FAB, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { themeColors } from "../../../variables/colors";
import { CommunityStackScreenProps } from "../../../variables/navigation";

export default function Community() {
  const [activeTab, setActiveTab] = useState<"Recruit" | "Discuss">("Discuss");
  const [searchQuery, setSearchQuery] = useState("");
  const navigation =
    useNavigation<CommunityStackScreenProps<"CommunityScreen">["navigation"]>();

  return (
    <>
      <View>
        <ScrollView
          horizontal
          style={{ backgroundColor: themeColors.primaryContainer }}
        >
          <View style={styles.tabs}>
            <TouchableOpacity
              onPress={() => setActiveTab("Discuss")}
              style={activeTab === "Discuss" ? styles.active : styles.box}
            >
              <Text style={activeTab === "Discuss" ? styles.activeText : {}}>
                야구톡
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("Recruit")}
              style={activeTab === "Recruit" ? styles.active : styles.box}
            >
              <Text style={activeTab === "Recruit" ? styles.activeText : {}}>
                모집
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View style={styles.subforums}>
        <View style={styles.choices}>
          <View style={styles.choice}>
            <Text variant="titleMedium">커뮤니티</Text>
          </View>
          <View style={styles.choice}>
            <Text variant="titleMedium">자세 분석</Text>
          </View>
          <View style={styles.choice}>
            <Text variant="titleMedium">벼룩시장</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TextInput
          mode="outlined"
          placeholder="제목, 내용으로 검색하세요."
          onChangeText={setSearchQuery}
          value={searchQuery}
          left={<TextInput.Icon icon="magnify" />}
          outlineStyle={styles.searchBar}
        />
        <Text style={{ flex: 1 }}>우리동네만 보기</Text>
      </View>
      <View style={styles.filters}>
        <Text>전체</Text>
        <Text>일반</Text>
        <Text>KBO</Text>
        <Text>MLB</Text>
        <Text>장비</Text>
      </View>
      <View style={styles.sort}>
        <Text>최신순</Text>
        <Text>인기순</Text>
        <Text>조회 많은 순</Text>
        <Text>댓글 많은 순</Text>
      </View>
      <FAB
        label="글 작성"
        icon="plus"
        style={{ position: "absolute", right: 10, bottom: 10 }}
        onPress={() => navigation.navigate("PostCreate")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    marginTop: 5,
  },
  active: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    marginHorizontal: 5,
    backgroundColor: themeColors.secondaryContainer,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: themeColors.primary,
  },
  box: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    marginHorizontal: 5,
  },
  activeText: {
    fontWeight: "bold",
  },
  subforums: {
    backgroundColor: themeColors.primaryContainer,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  choices: {
    backgroundColor: themeColors.secondaryContainer,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  choice: {
    paddingVertical: 10,
  },
  searchBar: {
    margin: 5,
    borderRadius: 20,
  },
  filters: {
    flexDirection: "row",
  },
  sort: {
    flexDirection: "row",
  },
});
