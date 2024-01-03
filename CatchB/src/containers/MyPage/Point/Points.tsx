import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { themeColors } from "../../../variables/colors";

export default function Points() {
  return (
    <View style={styles.container}>
      <Text>포인트</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 80,
  },
});
