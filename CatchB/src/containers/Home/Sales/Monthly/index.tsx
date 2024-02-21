import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";

import { themeColors } from "../../../../variables/colors";

export default function MonthlySales() {
  return (
    <View style={styles.box}>
      <View style={styles.line1}>
        <Text>2023년 9월</Text>
        <TouchableOpacity style={styles.calendar}>
          <Icon source="calendar-blank-outline" size={14} />
          <Text> 월 선택</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line2}>
        <Text variant="titleLarge">총 매출</Text>
        <Text variant="headlineSmall" style={styles.sales}>
          10,254,500원
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    margin: 15,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: themeColors.tertiaryContainer,
    borderRadius: 10,
  },
  line1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calendar: {
    backgroundColor: themeColors.primaryContainer,
    borderRadius: 5,
    flexDirection: "row",
    padding: 5,
    marginTop: -5,
  },
  line2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  sales: {
    marginTop: 5,
    fontWeight: "bold",
  },
});
