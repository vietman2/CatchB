import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";

import { CoachType } from "../../../variables/types/products";
import { themeColors } from "../../../variables/colors";

interface Props {
  coach: CoachType;
}

export default function CoachSimple({ coach }: Props) {
  const [isLiked, setIsLiked] = useState(false);

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
      <View style={styles.interactionBox}>
        <TouchableOpacity
          onPress={() => setIsLiked(!isLiked)}
          testID="like-icon"
        >
          <Icon
            source={isLiked ? "heart" : "heart-outline"}
            size={20}
            color={themeColors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icon source="share-outline" size={20} testID="share-icon" />
        </TouchableOpacity>
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
  interactionBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
