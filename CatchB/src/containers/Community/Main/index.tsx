import { View } from "react-native";
import { Text } from "react-native-paper";

import { default as CommunityMain } from "./CommunityMain";

// TODO: Remove This Later
export function PlaceholderComponent() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="titleMedium">준비 중입니다.</Text>
    </View>
  );
}

export default CommunityMain;
