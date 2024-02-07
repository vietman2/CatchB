import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/store";
import { themeColors } from "../../../variables/colors";
import { useNavigation } from "@react-navigation/native";
import { NearbyStackScreenProps } from "../../../variables/navigation";

export default function FacilityReserve() {
  const navigation =
    useNavigation<NearbyStackScreenProps<"FacilityReserve">["navigation"]>();
  const facility = useSelector(
    (state: RootState) => state.facility.selectedFacility
  );

  const handlePayment = () => {
    navigation.navigate("Payment");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          margin: 20,
        }}
      >
        <View style={{ flex: 3, marginLeft: 20 }}>
          <Text variant="headlineMedium" style={styles.titleText}>
            {facility.name}
          </Text>
        </View>
      </View>
      <Text variant="titleLarge" style={styles.titleText}>
        날짜 & 시간
      </Text>
      <Text variant="titleLarge" style={styles.titleText}>
        상품
      </Text>
      <Text variant="titleLarge" style={styles.titleText}>
        요약
      </Text>
      <Text variant="titleMedium">총 금액</Text>
      <Text variant="titleLarge" style={styles.titleText}>
        결제수단
      </Text>
      <Text variant="titleMedium">등록된 결제수단</Text>
      <Text variant="titleMedium">기타 결제수단</Text>
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
  titleText: {
    marginTop: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  imageBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    height: 70,
    marginRight: 10,
  },
});
