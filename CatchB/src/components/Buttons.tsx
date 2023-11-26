import { Image, StyleSheet, Dimensions } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

import { colors } from "../variables/colors";

const { width } = Dimensions.get("window");

interface loginButtonProps {
  text: string;
  onPress: () => void;
  testID?: string;
}

export const LoginButton = ({ text, onPress, testID }: loginButtonProps) => {
  return (
    <TouchableRipple
      style={buttonStyles.button}
      onPress={onPress}
      rippleColor="rgba(0, 0, 0, .32)"
      testID={testID}
    >
      <Text
        variant="titleMedium"
        style={{ color: colors.whiteText, fontFamily: "Catch B ExtraBold" }}
      >
        {text}
      </Text>
    </TouchableRipple>
  );
};

interface portalLoginButtonProps {
  onPress: () => void;
}

export const KakaoLoginButton = ({ onPress }: portalLoginButtonProps) => {
  return (
    <TouchableRipple onPress={onPress}>
      <Image
        source={require("assets/images/kakao_login_large_narrow.png")}
        style={{ ...buttonStyles.portalButton, width: width * 0.38 }}
        testID={"kakao-button"}
      />
    </TouchableRipple>
  );
};

export const NaverLoginButton = ({ onPress }: portalLoginButtonProps) => {
  return (
    <TouchableRipple onPress={onPress}>
      <Image
        source={require("assets/images/btnG_완성형.png")}
        style={{ ...buttonStyles.portalButton, width: width * 0.35 }}
        testID="naver-button"
      />
    </TouchableRipple>
  );
};

interface textButtonProps {
  text: string;
  onPress: () => void;
}

export const TextButton = ({ text, onPress }: textButtonProps) => {
  return (
    <TouchableRipple onPress={onPress}>
      <Text variant="bodySmall" style={buttonStyles.text}>
        {text}
      </Text>
    </TouchableRipple>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  portalButton: {
    resizeMode: "contain",
    height: 50,
  },
  text: {
    color: colors.blackText,
    fontSize: 14,
    padding: 5,
  },
});
