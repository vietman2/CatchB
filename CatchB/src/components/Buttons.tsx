import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { colors } from "../variables/colors";

interface loginButtonProps {
  text: string;
  onPress: () => void;
}

export const LoginButton = ({ text, onPress }: loginButtonProps) => {
  return (
    <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
      <Text style={buttonStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

interface portalLoginButtonProps {
  onPress: () => void;
}

export const KakaoLoginButton = ({ onPress }: portalLoginButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require("assets/images/kakao_login_large.png")}
        style={buttonStyles.portalButton}
        testID={"kakaoButton"}
      />
    </TouchableOpacity>
  );
};

export const NaverLoginButton = ({ onPress }: portalLoginButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require("assets/images/btnG_축약형.png")}
        style={buttonStyles.portalButton}
        testID="naverButton"
      />
    </TouchableOpacity>
  );
};

interface textButtonProps {
  text: string;
  onPress: () => void;
}

export const TextButton = ({ text, onPress }: textButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles.textButton}>
      <Text style={buttonStyles.normalText}>{text}</Text>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: colors.greybackground,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  portalButton: {
    borderRadius: 25,
    padding: 10,
    resizeMode: "contain",
    height: 50,
    width: 120,
  },
  textButton: {
    marginTop: 10,
  },
  normalText: {
    fontSize: 15,
    fontWeight: "normal",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
