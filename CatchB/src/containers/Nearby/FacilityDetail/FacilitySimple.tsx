import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";

import { FacilityType } from "../../../variables/types";
import { themeColors } from "../../../variables/colors";

interface Props {
  facility: FacilityType;
}

export default function FacilitySimple({ facility }: Props) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.imageBox} />
      <View style={styles.infoBox}>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          {facility.name}
        </Text>
        <View style={styles.rating}>
          <Icon source="star" size={20} color="gold" />
          <Text>{facility.rating}/10</Text>
        </View>
        <Text>{facility.location}</Text>
      </View>
      <View style={styles.interactionBox}>
        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
          <Icon
            source={isLiked ? "heart" : "heart-outline"}
            size={20}
            color={themeColors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icon source="share-outline" size={20} />
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
  interactionBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
});
