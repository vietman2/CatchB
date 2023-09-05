import { Text, View, StyleSheet } from "react-native";

import { CoachInfoType } from "../../../variables/types";

interface Props {
  coach: CoachInfoType;
}

export default function CoachDetail({ coach }: Props) {
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
