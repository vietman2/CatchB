import { StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

import { themeColors } from "../../variables/colors";

interface loginButtonProps {
  text: string;
  onPress: () => void;
  testID?: string;
}

export default function LoginButton({ text, onPress, testID }: loginButtonProps) {
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

const buttonStyles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: themeColors.primary,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

