import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Icon, Text } from "react-native-paper";

import { themeColors } from ".themes/colors";
import { FacilitySimpleType } from ".types/products";

interface Props {
  facility: FacilitySimpleType;
}

function FacilityImage({ facility }: Readonly<Props>) {
  return <Image source={0} src={facility.profile} style={styles.imageBox} />;
}

export function FacilitySimple({ facility }: Readonly<Props>) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.container}>
      <FacilityImage facility={facility} />
      <View style={styles.infoBox}>
        <Text variant="titleMedium" style={styles.bold}>
          {facility.name}
        </Text>
        <View style={styles.rating}>
          <Icon source="star" size={20} color="gold" />
          <Text>0/10</Text>
        </View>
        <Text>{facility.region}</Text>
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
  interactionBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  }
});
