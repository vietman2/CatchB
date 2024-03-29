import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { themeColors } from ".themes/colors";

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function NumberPicker({ label, value, onChange }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <View style={styles.numbers}>
        <View style={styles.titleBox}>
          <Text variant="bodyLarge" style={styles.title}>
            {label}
          </Text>
        </View>
        <View style={styles.numbersContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <TouchableOpacity
              style={[
                styles.number,
                value === index
                  ? { backgroundColor: themeColors.tertiaryContainer }
                  : {},
              ]}
              key={index}
              onPress={() => onChange(index)}
            >
              <Text
                style={{
                  color: value === index ? "white" : "gray",
                }}
              >
                {index === 5 ? "5+" : index}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: themeColors.tertiary,
  },
  titleBox: {
    flex: 2,
  },
  title: {
    fontWeight: "600",
    color: "black",
    marginRight: 10,
  },
  numbersContainer: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  numbers: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  number: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
});
