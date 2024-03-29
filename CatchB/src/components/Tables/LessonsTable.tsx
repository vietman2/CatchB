import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { Selector } from ".components/Selectors";
import { LessonProductType } from ".types/products";

interface Props {
  products: LessonProductType[];
}

export function LessonsTable({ products }: Readonly<Props>) {
  const [selected, setSelected] = useState("그룹 레슨");

  const renderPrice = (price: number) => {
    // 10,000원 형식
    return price.toLocaleString();
  };

  const filters = ["그룹 레슨", "1:1 레슨", "기타"];

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
          <Text variant="titleLarge">{product.title}</Text>
          <Text variant="titleMedium" style={styles.description}>
            {product.description}
          </Text>
          <Text variant="titleLarge">{renderPrice(product.price)}원</Text>
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
  description: {
    marginVertical: 10,
  },
});
