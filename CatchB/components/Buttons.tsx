import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface loginButtonProps {
  text: string;
  onPress: () => void;
}

export const LoginButton = ({ text, onPress }: loginButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

interface portalLoginButtonProps {
  kakao: boolean
  onPress: () => void;
}

export const PortalLoginButton = ({ kakao, onPress }: portalLoginButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={kakao ? require("../assets/images/kakao_login_large.png") : require("../assets/images/btnG_축약형.png")} style={styles.portalButton} />
    </TouchableOpacity>
  );
};

interface textButtonProps {
  text: string;
  onPress: () => void;
}

export const TextButton = ({ text, onPress }: textButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.textButton}>
      <Text style={styles.normalText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: "gray",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textButton: {
    marginTop: 10,
  },
  normalText: {
    fontSize: 15,
    fontWeight: "normal",
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  portalButton: {
    borderRadius: 25,
    padding: 10,
    resizeMode: "contain",
    height: 50,
    width: 120,
  },
});
