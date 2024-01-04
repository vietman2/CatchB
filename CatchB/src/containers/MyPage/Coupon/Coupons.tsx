import { View, StyleSheet, ScrollView } from "react-native";
import { Icon, Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { MyPageStackScreenProps } from "../../../variables/navigation";
import { themeColors } from "../../../variables/colors";
import { Coupon as CouponType } from "../../../variables/types";

export default function Coupons() {
  const route = useRoute<MyPageStackScreenProps<"Coupons">["route"]>();
  const { coupons } = route.params;

  const NoCoupon = () => {
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
  };

  const Coupon = ({ coupon }: { coupon: CouponType }) => {
    return (
      <View style={styles.coupon}>
        <LinearGradient
          colors={["white", "silver"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[ 0.4, 0.9]}
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text variant="titleMedium">사용가능쿠폰 n장</Text>
        <Text variant="titleMedium">+ 쿠폰등록</Text>
      </View>
      {coupons.length === 0 ? (
        <NoCoupon />
      ) : (
        <ScrollView>
          {coupons.map((coupon, index) => {
            return <Coupon key={index} coupon={coupon} />;
          })}
        </ScrollView>
      )}
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
    marginTop: 20,
    marginBottom: 10,
  },
  noCoupon: {
    justifyContent: "center",
    alignItems: "center",
  },
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
