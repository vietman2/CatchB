import { View, StyleSheet } from "react-native";

import { themeColors } from "../../../variables/colors";
import DividerWithText from "../../../components/Divider/DividerWithText";
import LoginLogo from "../../../components/Logos/LoginLogo";
import LoginButton from "../../../components/Buttons/LoginButton";

export default function SignUpOptions() {
    const handleSignUp = () => {};

  return (
    <View style={styles.mainContainer}>
      {/* <로고 /> */}
      <LoginLogo />
      <View style={styles.container}>
        <LoginButton text="회원가입" onPress={handleSignUp} testID="signup" />
        <DividerWithText text="간편 회원가입" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
  },
  container: {
    marginHorizontal: 50,
  }
});
