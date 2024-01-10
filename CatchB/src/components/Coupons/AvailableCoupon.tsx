import { View, StyleSheet } from "react-native";
import { Text, Icon } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import { Coupon as CouponType } from "../../variables/types";

interface Props {
  coupon: CouponType;
}

export default function AvailableCoupon({ coupon }: Props) {
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
        <View style={styles.download}>
          <Icon source="tray-arrow-down" size={32} />
        </View>
      </LinearGradient>
    </View>
  );
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
    flex: 6,
    marginRight: 50,
    marginVertical: 20,
  },
  download: {
    flex: 1,
  },
});
