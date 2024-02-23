import { View } from "react-native";
import { Text } from "react-native-paper";

import { default as CommunityMain } from "./CommunityMain";
import { CommunityList } from "../PostLists";

// TODO: Remove This Later
export function PlaceholderComponent() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="titleMedium">준비 중입니다.</Text>
    </View>
  );
}

export function BaseballCommunity() {
  return <CommunityList mode="야구톡" />;
}

export function RecruitmentCommunity() {
  return <CommunityList mode="모집" />;
}

export default CommunityMain;
