import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-paper";

export function ImagePlaceholder() {
  return (
    <View style={styles.container}>
      <Icon source="plus" size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
});
