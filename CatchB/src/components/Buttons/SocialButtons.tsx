import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export function NaverButton() {
  return (
    <View
      style={{
        ...styles.social,
        backgroundColor: "#03C75A",
      }}
    >
      <Image
        style={{ ...styles.image, height: 45 }}
        source={require("assets/images/btnG_아이콘사각.png")}
        resizeMode="contain"
      />
      <Text style={{ ...styles.socialText, color: "white" }}>
        네이버로 로그인
      </Text>
    </View>
  );
}

export function KakaoButton() {
  return (
    <View
      style={{
        ...styles.social,
        backgroundColor: "#fee500",
      }}
    >
      <Image
        style={{ ...styles.image, height: 30 }}
        source={require("assets/images/kakao_login_large_wide.png")}
        resizeMode="contain"
      />
      <Text
        style={{
          ...styles.socialText,
          color: "rgba(0, 0, 0, 0.85)",
        }}
      >
        카카오로 로그인
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  social: {
    flexDirection: "row",
    borderRadius: 5,
    marginTop: 10,
    height: 40,
    alignItems: "center",
  },
  socialText: {
    flex: 8,
    fontSize: 18,
    textAlign: "center",
  },
  image: {
    flex: 1,
    marginLeft: 10,
  },
});
