import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { themeColors } from "../../../variables/colors";

export default function Coupons() {
  const NoCoupon = () => {
    return (
      <View>
        <Text>쿠폰이 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text variant="titleMedium">사용가능쿠폰 n장</Text>
        <Text variant="titleMedium">+ 쿠폰등록</Text>
      </View>
      <NoCoupon />
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
