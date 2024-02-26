import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export function NoCoupon() {
  return (
    <View style={styles.noCouponContainer}>
      <View style={styles.noCoupon} />
      <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
        보유한 쿠폰이 없습니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noCouponContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noCoupon: {
    backgroundColor: "gray",
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
