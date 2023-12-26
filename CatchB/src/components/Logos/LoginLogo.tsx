import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function LoginLogo() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.text}>{`지금 로그인하고 \n홍승우에게 푼 돈을 쥐어주세요!`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
    marginBottom: 50,
  },
  text: {
    fontFamily: "Catch B Bold",
    textAlign: "center",
  }
});
