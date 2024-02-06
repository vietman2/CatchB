import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import SingleCheck from "../Checkboxes/SingleCheck";
import { ReservationProduct } from "../../variables/types";

interface Props {
  products: ReservationProduct[];
}

export default function ProductsTable({ products }: Props) {
  const [selected, setSelected] = useState("1회 대관");

  const renderPrice = (price: number) => {
    // 10,000원 형식
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const filters = ["1회 대관", "정기 대관", "기타"]

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <SingleCheck options={filters} selected={selected} setSelected={setSelected} required />
      </View>
      {products.map((product, index) => (
        <View key={index} style={styles.product}>
          <Text variant="titleMedium">{product.title}</Text>
          <Text variant="bodyLarge">{renderPrice(product.price)}원</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  filters: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  product: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "silver",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  }
});
