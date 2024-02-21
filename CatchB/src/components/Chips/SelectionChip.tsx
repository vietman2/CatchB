import { View, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-paper";

interface Props {
  selected: boolean;
  label: string;
}

export default function SelectionChip({ selected, label }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: selected ? "white" : "black" }]}>
        {label}
      </Text>
      <Icon
        source="check"
        color={selected ? "white" : "transparent"}
        size={20}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingLeft: 5,
  },
});
