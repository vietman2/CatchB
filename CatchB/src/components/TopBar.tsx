import { View, Text, StyleSheet } from "react-native";

import { colors } from "../variables/colors";

export const leftTitle = () => {
  return <Text style={styles.leftTitle}>Catch B</Text>;
};

export const rightTitle = () => {
  return <Text style={styles.rightTitle}>캐치비</Text>;
};

export default function TopBar() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {leftTitle()}
        {rightTitle()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 50 },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftTitle: {
    marginHorizontal: 27,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  rightTitle: {
    marginHorizontal: 27,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.secondary,
  },
});
