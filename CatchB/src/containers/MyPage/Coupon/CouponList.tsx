import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { ActivityIndicator, Coupon, NoCoupon } from "./fragments";
import { getCouponList } from "../../../services/user_management/coupon";
import { setCouponListState } from "../../../store/slices/user_management/couponSlice";
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
        await dispatch(setCouponListState(response.data));
        setLoading(false);
      } else {
        //TODO: error handling
        setLoading(false);
      }
    };
    getCoupons();
  }, []);

  const renderCoupons = () => {
    if (coupons.length === 0) {
      return <NoCoupon />;
    } else {
      return (
        <ScrollView>
          {coupons.map((coupon) => {
            return <Coupon key={coupon.id} coupon={coupon} />;
          })}
          <Divider />
          <Coupon />
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text variant="titleMedium">사용가능쿠폰 {coupons.length}장</Text>
        <TouchableOpacity onPress={handleCouponRegister}>
          <Text variant="titleMedium">+ 쿠폰등록</Text>
        </TouchableOpacity>
      </View>
      {loading ? <ActivityIndicator /> : renderCoupons()}
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
