import { Text, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import { HomeStackScreenProps } from "../../../containers/navigation";

export default function CoachDetail() {
  const route = useRoute<HomeStackScreenProps<"CoachDetail">["route"]>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.coach.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {},
});
