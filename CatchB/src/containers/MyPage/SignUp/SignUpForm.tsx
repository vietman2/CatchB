import { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import LoginButton from "../../../components/Buttons/LoginButton";
import { themeColors } from "../../../variables/colors";

export default function SignUpForm() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordCheckVisible, setIsPasswordCheckVisible] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignUp = () => {
    setError("회원가입 기능은 아직 구현되지 않았습니다.");
  };

  const onPressEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);
  const onPressEyeIcon2 = () =>
    setIsPasswordCheckVisible(!isPasswordCheckVisible);

  return (
    <ScrollView style={styles.mainContainer}>
      <KeyboardAvoidingView behavior="height">
        <View style={styles.container}>
          <TextInput
            label="아이디"
            placeholder="로그인에 사용할 아이디를 입력하세요."
            onChangeText={(text) => setUsername(text)}
            value={username}
            style={{ marginVertical: 5 }}
            testID="username-input"
          />
          <TextInput
            label="비밀번호"
            placeholder="비밀번호를 입력하세요."
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!isPasswordVisible}
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color={themeColors.primary}
                    onPress={onPressEyeIcon}
                    testID="password-eye-icon"
                  />
                )}
              />
            }
            style={{ marginVertical: 5 }}
            testID="password-input"
          />
          <TextInput
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력하세요."
            onChangeText={(text) => setPasswordCheck(text)}
            value={passwordCheck}
            secureTextEntry={!isPasswordCheckVisible}
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name={
                      isPasswordCheckVisible ? "eye-off-outline" : "eye-outline"
                    }
                    size={24}
                    color={themeColors.primary}
                    onPress={onPressEyeIcon2}
                    testID="password-check-eye-icon"
                  />
                )}
              />
            }
            style={{ marginVertical: 5 }}
            testID="password-check-input"
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TextInput
              label="성"
              placeholder="성을 입력하세요."
              onChangeText={(text) => setLastName(text)}
              value={lastName}
              style={{ marginVertical: 5, flex: 1, marginRight: 5 }}
              testID="last-name-input"
            />
            <TextInput
              label="이름"
              placeholder="이름을 입력하세요."
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
              style={{ marginVertical: 5, flex: 1, marginLeft: 5 }}
              testID="first-name-input"
            />
          </View>

          <TextInput
            label="이메일"
            placeholder="이메일 주소를 입력하세요."
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={{ marginVertical: 5 }}
            testID="email-input"
          />
          <TextInput
            label="전화번호"
            placeholder="전화번호를 입력하세요."
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            style={{ marginVertical: 5 }}
            testID="phone-number-input"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
          <LoginButton
            text="회원가입"
            onPress={handleSignUp}
            testID="sign-up-button"
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
  },
  container: {
    marginHorizontal: 50,
    justifyContent: "center",
    marginTop: 60,
  },
  errorText: {
    color: themeColors.error,
    marginHorizontal: 50,
    marginTop: 5,
  },
});
