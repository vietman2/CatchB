import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { themeColors } from "../../variables/colors";

export default function Community() {
  return (
    <View style={styles.container}>
      <Text>Community</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: themeColors.primaryContainer },
});
