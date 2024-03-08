import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export function NaverButton() {
  return (
    <View style={[styles.social, styles.naverBackground]}>
      <Image
        style={[styles.image, styles.naverHeight]}
        source={require("assets/images/btnG_아이콘사각.png")}
        resizeMode="contain"
      />
      <Text style={[styles.socialText, styles.naverColor]}>
        네이버로 로그인
      </Text>
    </View>
  );
}

export function KakaoButton() {
  return (
    <View style={[styles.social, styles.kakaoBackground]}>
      <Image
        style={[styles.image, styles.kakaoHeight]}
        source={require("assets/images/kakao_login_large_wide.png")}
        resizeMode="contain"
      />
      <Text style={[styles.socialText, styles.kakaoColor]}>
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
  naverHeight: {
    height: 45,
  },
  naverBackground: {
    backgroundColor: "#03C75A",
  },
  naverColor: {
    color: "white",
  },
  kakaoHeight: {
    height: 30,
  },
  kakaoBackground: {
    backgroundColor: "#fee500",
  },
  kakaoColor: {
    color: "rgba(0, 0, 0, 0.85)",
  },
});
