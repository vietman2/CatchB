import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function NoPoints() {
  return (
    <Text variant="bodyLarge" style={styles.title}>
      포인트 내역이 없습니다.
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
