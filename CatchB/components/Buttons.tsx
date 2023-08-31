import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface loginButtonProps {
  text: string;
  onPress: () => void;
  kakao: boolean;
}

export const LoginButton = ({ text, onPress, kakao }: loginButtonProps) => {
  return (
    <TouchableOpacity
      style={
        kakao
          ? { ...styles.button, backgroundColor: "yellow" }
          : styles.button
      }
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
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
});
