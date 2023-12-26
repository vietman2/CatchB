import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";

export default function NaverButton() {
  return (
    <View style={styles.buttonContainer}>
      <Image
        style={styles.image}
        source={require("assets/images/btnG_아이콘사각.png")}
        resizeMode="contain"
      />
      <Text style={styles.text}>네이버로 로그인</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#03C75A",
    borderRadius: 5,
    marginTop: 10,
    height: 40,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    flex: 8,
    fontSize: 18,
    textAlign: "center",
  },
  image: {
    height: 45,
    flex: 1,
    marginLeft: 10,
  },
});
