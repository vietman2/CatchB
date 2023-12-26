import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";

export default function KakaoButton() {
  return (
    <View style={styles.buttonContainer}>
      <Image
        style={styles.image}
        source={require("assets/images/kakao_login_large_wide.png")}
        resizeMode="contain"
      />
      <Text style={styles.text}>카카오로 로그인</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#fee500",
    borderRadius: 5,
    marginTop: 10,
    height: 40,
    alignItems: "center",
  },
  text: {
    color: "rgba(0, 0, 0, 0.85)",
    flex: 8,
    fontSize: 18,
    textAlign: "center",
  },
  image: {
    height: 30,
    flex: 1,
    marginLeft: 10,
  },
});
