import { StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

import { themeColors } from "../../variables/colors";

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
        style={{
          color: themeColors.onPrimary,
          fontFamily: "Catch B ExtraBold",
        }}
      >
        {text}
      </Text>
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
      <Text variant="titleLarge" style={buttonStyles.text}>
        {text}
      </Text>
    </TouchableRipple>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: themeColors.primary,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  text: {
    padding: 10,
  },
});
