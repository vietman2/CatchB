import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { themeColors } from "../../variables/colors";

export const leftTitle = () => {
  return (
    <Text
      variant="titleLarge"
      style={{ ...styles.title, color: themeColors.primary }}
    >
      Catch B
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 27,
    fontFamily: "Catch B ExtraBold",
  },
});
