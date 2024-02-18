import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function LoginLogo() {
  return (
    <View style={styles.container}>
      <Text
        variant="headlineMedium"
        style={styles.text}
      >{`로고`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
    marginBottom: 50,
  },
  text: {
    fontFamily: "Catch B Bold",
    textAlign: "center",
  },
});
