import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function NoCoupon() {
    return (
      <View style={styles.noCoupon}>
        <View
          style={{
            backgroundColor: "gray",
            width: 100,
            height: 100,
            marginBottom: 20,
          }}
        />
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          보유한 쿠폰이 없습니다.
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
    noCoupon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
