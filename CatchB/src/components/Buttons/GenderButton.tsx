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
      <TouchableOpacity onPress={() => setGender("M")} testID="male-button">
        <Surface mode="flat" style={gender === "M" ? styles.chosen : styles.notChosen}>
          <Text>남</Text>
        </Surface>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setGender("F")} testID="female-button">
        <Surface mode="flat" style={gender === "F" ? styles.chosen : styles.notChosen}>
          <Text>여</Text>
        </Surface>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  chosen: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgba(64, 196, 20, 0.75)",
  },
  notChosen: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgba(64, 196, 20, 0.05)",
  },
});
