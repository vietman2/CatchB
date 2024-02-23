import { View } from "react-native";
import { Text } from "react-native-paper";

import { default as HistoryMain } from "./HistoryMain";

// TODO: Remove this later
export function NotReady() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineSmall">준비중입니다.</Text>
    </View>
  );
}

export default HistoryMain;
