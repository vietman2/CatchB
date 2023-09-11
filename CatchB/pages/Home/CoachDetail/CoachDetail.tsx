import { Text, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import { HomeStackScreenProps } from "../../../containers/navigation";

export default function CoachDetail() {
  const route = useRoute<HomeStackScreenProps<"CoachDetail">["route"]>();
  const coach = route.params.coach;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{coach.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {},
});
