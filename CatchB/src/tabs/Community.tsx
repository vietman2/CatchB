import { View, Text, StyleSheet } from "react-native";

export default function Community() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.leftTitle}>Catch B</Text>
        <Text style={styles.rightTitle}>캐치비</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 20 },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 27,
  },
  leftTitle: { fontSize: 20, fontWeight: "bold", color: "green" },
  rightTitle: { fontSize: 20, fontWeight: "bold", color: "brown" },
});
