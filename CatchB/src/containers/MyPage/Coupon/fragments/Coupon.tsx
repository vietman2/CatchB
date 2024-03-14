import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import { CouponType } from ".types/users";

interface Props {
  coupon?: CouponType;
}

export function Coupon({ coupon }: Readonly<Props>) {
  if (!coupon) {
    return (
      <View style={styles.coupon}>
        <LinearGradient
          colors={["white", "silver"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0.4, 0.9]}
        >
          <View style={styles.couponInfo}>
            <Text variant="headlineMedium">다운 가능한 쿠폰</Text>
          </View>
          <View style={styles.download}>
            <Icon source="tray-arrow-down" size={32} />
          </View>
        </LinearGradient>
      </View>
    );
  } else {
    return (
      <View style={styles.coupon}>
        <LinearGradient
          colors={["lightblue", "gold"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0.4, 0.9]}
        >
          <View style={styles.couponInfo}>
            <Text
              variant="headlineMedium"
              style={{ fontFamily: "Catch B ExtraBold", marginBottom: 5 }}
            >
              {coupon.coupon_class.coupon_name}
            </Text>
            <Text variant="bodyLarge">
              {coupon.coupon_class.coupon_description}
            </Text>
            <Text variant="bodySmall">만료기한 {coupon.valid_until}</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  coupon: {
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "silver",
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  gradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  couponInfo: {
    marginVertical: 20,
  },
  download: {
    flex: 1,
  },
});
