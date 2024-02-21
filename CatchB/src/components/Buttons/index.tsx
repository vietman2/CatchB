import { Image, StyleSheet, View } from "react-native";
import { Icon, IconButton, Text } from "react-native-paper";

import { themeColors } from "../../variables/colors";

interface BackProps {
  onPress: () => void;
}

export function BackButton({ onPress }: Readonly<BackProps>) {
  return <IconButton icon="arrow-left" onPress={onPress} testID="back" />;
}

interface IconProps {
  icon: string;
  title: string;
}

export function IconTextButton({ icon, title }: Readonly<IconProps>) {
  return (
    <View style={styles.container}>
      <Icon source={icon} size={20} color={themeColors.primary} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

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
  container: {
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    marginTop: 5,
  },
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
