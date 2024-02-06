import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { getCouponList } from "../../../services/user_management/coupon";
import { setCouponListState } from "../../../store/slices/user_management/couponSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { MyPageStackScreenProps } from "../../../variables/navigation";
import { themeColors } from "../../../variables/colors";
import { Coupon as CouponType } from "../../../variables/types";

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

const MyCoupon = ({ coupon }: { coupon: CouponType }) => {
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
};

export default function CouponList() {
  const [loading, setLoading] = useState(true);
  const navigation =
    useNavigation<MyPageStackScreenProps<"CouponList">["navigation"]>();
  const token = useSelector((state: RootState) => state.auth.token);
  const coupons = useSelector((state: RootState) => state.coupon.coupons);
  const dispatch = useDispatch<AppDispatch>();

  const handleCouponRegister = () => {
    navigation.navigate("CouponRegister");
  };

  useEffect(() => {
    const getCoupons = async () => {
      const response = await getCouponList(token);
      if (response.status === 200) {
        await dispatch(setCouponListState(response.data));
        setLoading(false);
      } else {
        console.log("error");
      }
    };
    getCoupons();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text variant="titleMedium">사용가능쿠폰 {coupons.length}장</Text>
        <TouchableOpacity onPress={handleCouponRegister}>
          <Text variant="titleMedium">+ 쿠폰등록</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={themeColors.primary}
          style={{ flex: 1, marginBottom: 30 }}
        />
      ) : coupons.length === 0 ? (
        <NoCoupon />
      ) : (
        <ScrollView>
          {coupons.map((coupon, index) => {
            return <MyCoupon key={index} coupon={coupon} />;
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
    marginVertical: 20,
  },
});
