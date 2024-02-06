import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { themeColors } from "../../../variables/colors";

export default function Payment() {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.titleText}>
        결제 서비스는 준비중입니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    marginTop: 20,
    fontWeight: "bold",
  },
});
