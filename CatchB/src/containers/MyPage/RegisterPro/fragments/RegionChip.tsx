import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { themeColors } from ".constants/themes/colors";

interface Props {
  text: string;
  onPress?: () => void;
}

export function RegionChip({ text, onPress }: Readonly<Props>) {
  return (
    <TouchableOpacity style={styles.chip} onPress={onPress}>
      <Text variant="titleSmall" style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: themeColors.primary,
    borderRadius: 7.5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
