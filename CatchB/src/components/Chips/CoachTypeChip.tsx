import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  is_academy_coach: boolean;
}

export function CoachTypeChip({ is_academy_coach }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.chip,
          { backgroundColor: is_academy_coach ? "skyblue" : "lightgreen" },
        ]}
      >
        <Text>{is_academy_coach ? "아카데미 코치" : "캐치비 코치"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  chip: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
