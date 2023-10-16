import { View, Text, StyleSheet } from "react-native";

export default function Tabs() {
  const Tab = (text: string) => {
    return (
      <View style={styles.tab}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Tab("모집")}
      {Tab("용병")}
      {Tab("커뮤니티")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 25,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  text: { fontSize: 18, fontWeight: "bold" },
});
