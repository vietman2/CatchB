import { Image, StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

import { CoachSimpleType } from ".types/products";
import { CoachTypeChip } from ".components/Chips";

interface Props {
  coach: CoachSimpleType;
}

export function CoachSimple({ coach }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <Image
        source={0}
        src={coach.profile}
        style={styles.imageBox}
        resizeMode="center"
      />
      <View style={styles.infoBox}>
        <View>
          <View style={styles.horizontal}>
            <CoachTypeChip
              is_academy_coach={coach.is_academy_coach}
            />
            <View style={styles.rating}>
              <Icon source="star" size={20} color="#14863e" />
              <Text>0/10</Text>
            </View>
          </View>
          <View style={styles.horizontal}>
            <Text variant="headlineMedium" style={styles.name}>
              {coach.name} 코치
            </Text>
            <View style={styles.rating}>
              <Icon source="heart" size={16} color="#14863e" />
              <Text style={styles.text}>0</Text>
            </View>
          </View>
          <Text>{coach.regions}</Text>
        </View>
        <View></View>
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginRight: 10,
    height: 150,
  },
  infoBox: {
    flex: 3,
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    marginTop: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    marginLeft: 5,
  },
});
