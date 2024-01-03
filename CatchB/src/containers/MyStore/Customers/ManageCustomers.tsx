import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function ManageCustomers() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>리뷰 관리</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
