import { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Icon, Text } from "react-native-paper";

import { themeColors } from "../../../variables/colors";
import { RootState } from "../../../store/store";

const { width, height } = Dimensions.get("window");

export default function FacilityDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const facility = useSelector((state: RootState) => state.facility.selectedFacility);

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal pagingEnabled>
        <View style={{ ...styles.image, backgroundColor: "blue" }} />
        <View style={{ ...styles.image, backgroundColor: "red" }} />
        <View style={{ ...styles.image, backgroundColor: "yellow" }} />
      </ScrollView>
      <View style={styles.topLine}>
        <Text variant="titleLarge" style={styles.name}>{facility.name}</Text>
        <View style={styles.rating}>
          <Icon source="star" size={20} color="gold" />
          <Text>{facility.rating}/10</Text>
        </View>
        <View style={styles.interactions}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
  },
  image: {
    flex: 1,
    width,
    height: height / 3,
    backgroundColor: "red",
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  name: {
    flex: 5,
    fontWeight: "bold",
  },
  rating: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  interactions: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
  }
});
