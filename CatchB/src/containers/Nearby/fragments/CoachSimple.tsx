import { View, StyleSheet, Dimensions } from "react-native";
import { Icon, Text } from "react-native-paper";

import { CoachSimpleType } from ".types/products";

const { width } = Dimensions.get("window");

interface Props {
  coach: CoachSimpleType;
}

export function CoachSimple({ coach }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
        {coach.name} 코치
      </Text>
      <View style={styles.infoBox}>
        <View style={styles.rating}>
          <Icon source="star" size={20} color="gold" />
          <Text>0/10</Text>
        </View>
        <Text>ㅋㅋ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  imageBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    height: 180,
    width: width - 40,
  },
  infoBox: {
    flex: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
});
