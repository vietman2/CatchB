import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function PromotionMain() {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">준비중입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
