import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Icon, Text } from "react-native-paper";

import { CoachType } from ".types/products";

const { width } = Dimensions.get("window");

interface Props {
  coach: CoachType;
}

function CoachImage({ coach }: Readonly<Props>) {
  return (
    <Image source={coach.image} style={styles.imageBox} resizeMode="center" />
  );
}

export function CoachSimple({ coach }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
        {coach.coach_name} 코치
      </Text>
      <CoachImage coach={coach} />
      <View style={styles.infoBox}>
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
