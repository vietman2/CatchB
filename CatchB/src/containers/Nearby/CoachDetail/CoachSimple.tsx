import { View, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-paper";

import { CoachType } from "../../../variables/types/products";

interface Props {
  coach: CoachType;
}

export default function CoachSimple({ coach }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <View style={styles.imageBox} />
      <View style={styles.infoBox}>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          {coach.coach_name} 코치
        </Text>
        <View style={styles.rating}>
          <Icon source="star" size={20} color="gold" />
          <Text>{coach.rating}/10</Text>
        </View>
        <Text>{coach.working_area}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  imageBox: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    height: 60,
    marginRight: 10,
  },
  infoBox: {
    flex: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
});
