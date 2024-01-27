import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import RecruitList from "../PostLists/RecruitList";
import CommunityList from "../PostLists/CommunityList";
import { themeColors } from "../../../variables/colors";
import { CommunityStackScreenProps } from "../../../variables/navigation";

export default function Community() {
  const [activeTab, setActiveTab] = useState<"모집" | "야구톡" | "기타">(
    "야구톡"
  );
  const [visible, setVisible] = useState(true);
  const navigation =
    useNavigation<CommunityStackScreenProps<"CommunityScreen">["navigation"]>();

  const TabComponent = ({ tab }: { tab: "모집" | "야구톡" | "기타" }) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveTab(tab)}
        style={activeTab === tab ? styles.active : styles.box}
      >
        <Text
          style={activeTab === tab ? styles.activeText : {}}
          variant="titleLarge"
        >
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.tabs}>
        <TabComponent tab="야구톡" />
        <TabComponent tab="모집" />
        <TabComponent tab="기타" />
      </View>
      {activeTab === "야구톡" ? (
        <CommunityList
          hideFAB={() => setVisible(false)}
          showFAB={() => setVisible(true)}
        />
      ) : activeTab === "모집" ? (
        <RecruitList />
      ) : (
        <></>
      )}
      <FAB
        label="글 작성"
        icon="plus"
        visible={visible}
        style={{ position: "absolute", right: 10, bottom: 10 }}
        onPress={() => navigation.navigate("PostCreate")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    backgroundColor: themeColors.primaryContainer,
    justifyContent: "center",
  },
  active: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: themeColors.secondaryContainer,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: themeColors.primary,
  },
  box: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 5,
  },
  activeText: {
    fontWeight: "bold",
  },
});
