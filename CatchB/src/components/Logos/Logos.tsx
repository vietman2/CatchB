import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { themeColors } from "../../variables/colors";

export function LoginLogo() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.text}>{`로고`}</Text>
    </View>
  );
}

export function SmallLogo() {
  return (
    <Text variant="titleLarge" style={styles.smallLogo}>
      Catch B
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
    marginBottom: 50,
  },
  text: {
    fontFamily: "Catch B Bold",
    textAlign: "center",
  },
  smallLogo: {
    marginHorizontal: 27,
    fontFamily: "Catch B ExtraBold",
    color: themeColors.primary,
  },
});
