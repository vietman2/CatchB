import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { Points } from "../../variables/types";

interface Props {
  detail: Points;
}

export default function PointsDetail({ detail }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{detail.title}</Text>
      <View style={styles.detail}>
        <Text>{detail.description}</Text>
        <Text>{detail.points}</Text>
      </View>
      <Text style={styles.expireDate}>{detail.valid_until}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
  },
  expireDate: {
    marginTop: 10,
  },
});
