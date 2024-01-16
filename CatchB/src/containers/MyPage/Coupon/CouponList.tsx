import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import NoCoupon from "../../../components/CouponsDetail/NoCoupon";
import MyCoupon from "../../../components/CouponsDetail/MyCoupon";
import { getCouponList } from "../../../services/coupon";
import { setCouponListState } from "../../../store/slices/couponSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { MyPageStackScreenProps } from "../../../variables/navigation";
import { themeColors } from "../../../variables/colors";

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
        dispatch(setCouponListState(response.data));
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
});
