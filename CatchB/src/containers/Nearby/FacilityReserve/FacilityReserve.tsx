import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Icon, Text } from "react-native-paper";

import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";
import { NearbyScreenProps } from ".constants/navigation";

export default function FacilityReserve() {
  const navigation =
    useNavigation<NearbyScreenProps<"FacilityReserve">["navigation"]>();
  const route = useRoute<NearbyScreenProps<"FacilityReserve">["route"]>();
  // params에 있으면 params에서 가져오고 없으면 undefined
  const selectedDate = route.params?.selectedDate;
  const selectedTime = route.params?.selectedTime;
  const selectedProduct = route.params?.selectedProduct;
  const facility = useSelector(
    (state: RootState) => state.facility.selectedFacility
  );

  const handlePayment = () => {
    navigation.navigate("Payment");
  };

  const renderDate = () => {
    if (selectedDate) {
      // YYYY년 MM월 DD일 형식으로
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return `${year}년 ${month}월 ${day}일`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.facilityContainer}>
        <Icon source="baseball-diamond" size={36} color="green" />
        <Text variant="headlineMedium" style={styles.facilityTitle}>
          {facility.name}
        </Text>
      </View>
      <View style={styles.contentBox}>
        <Text variant="titleLarge" style={styles.titleText}>
          상품
        </Text>
        {selectedProduct && (
          <Text variant="titleMedium" style={styles.contentText}>
            {selectedProduct.title}
          </Text>
        )}
      </View>
      <View style={styles.contentBox}>
        <Text variant="titleLarge" style={styles.titleText}>
          날짜 & 시간
        </Text>
        <Text variant="titleMedium">{renderDate()}</Text>
        <Text variant="titleMedium">{selectedTime}</Text>
      </View>
      <View style={styles.contentBox}>
        <Text variant="titleLarge" style={styles.titleText}>
          결제수단
        </Text>
        <Text variant="titleMedium">등록된 결제수단</Text>
        <Text variant="titleMedium">기타 결제수단</Text>
      </View>
      <View style={styles.contentBox}>
        <Text variant="titleLarge" style={styles.titleText}>
          요약
        </Text>
        <Text variant="titleMedium">총 금액: {`15,000원`}</Text>
        <Text variant="titleMedium">할인: {`- 3,000원`}</Text>
        <Text variant="titleMedium">최종 결제 금액: {`12,000원`}</Text>
      </View>
      <Button
        mode="contained"
        style={{ marginTop: 20 }}
        onPress={handlePayment}
      >
        결제하기
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
  },
  facilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  facilityTitle: {
    marginLeft: 10,
    fontWeight: "bold",
    fontFamily: "Catch B ExtraBold",
    color: "green",
  },
  titleText: {
    fontWeight: "bold",
  },
  contentBox: {
    marginBottom: 20,
  },
  contentText: {
    marginTop: 5,
  },
});
