import { SetStateAction } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Surface, Text } from "react-native-paper";

interface Props {
  gender: "M" | "F" | "N";
  setGender: (gender: SetStateAction<"M" | "F" | "N">) => void;
}

export default function GenderButton({ gender, setGender }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setGender("M")}>
        <Surface style={gender === "M" ? styles.chosen : styles.notChosen}>
          <Text style={{ color: "white" }}>남</Text>
        </Surface>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setGender("F")}>
        <Surface style={gender === "F" ? styles.chosen : styles.notChosen}>
          <Text style={{ color: "white" }}>여</Text>
        </Surface>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "center" },
  chosen: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "green",
  },
  notChosen: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgba(64, 196, 20, 0.25)",
  },
});
