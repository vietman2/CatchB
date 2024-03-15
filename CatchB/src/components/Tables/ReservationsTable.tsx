import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { Selector } from ".components/Selectors";
import { ReservationProductType } from ".types/products";

interface Props {
  products: ReservationProductType[];
}

export function ReservationsTable({ products }: Readonly<Props>) {
  const [selected, setSelected] = useState("1회 대관");
  const filters = ["1회 대관", "정기 대관", "기타"];

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <Selector
          multiple={false}
          numItemsInRow={2}
          options={filters}
          singleSelected={selected}
          setSingleSelected={setSelected}
        />
      </View>
      {products.map((product) => (
        <View key={product.id} style={styles.product}>
          <Text variant="titleMedium">{product.title}</Text>
          <Text variant="bodyLarge">{product.price.toLocaleString()}원</Text>
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
  },
});
