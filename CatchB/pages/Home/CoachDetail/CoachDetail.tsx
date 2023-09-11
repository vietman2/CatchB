import { Text, View, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { HomeStackScreenProps } from "../../../containers/navigation";

export default function CoachDetail() {
  const route = useRoute<HomeStackScreenProps<"CoachDetail">["route"]>();
  const coach = route.params.coach;

  return (
    <View style={styles.container}>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    marginLeft: 100,
    fontSize: 24,
    fontFamily: "KBO Dia Gothic_bold",
  },
});
