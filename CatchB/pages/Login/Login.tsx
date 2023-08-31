import { useState } from "react";
import { View, KeyboardAvoidingView, Platform, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { containerStyles } from "./styles";
import { MyTextInput } from "../../components/TextInput";
import { LoginButton, TextButton } from "../../components/Buttons";
import { LoginLogo } from "../../components/Icons";
import { RootStackParamList } from "../../containers/BaseContainer";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    // 1. username, password 유효성 검사
    // 2. 로그인 요청
    // 3. 로그인 성공 시, 메인 페이지로 이동
    // 4. 로그인 실패 시, 실패 메시지 출력
  }

  const handleKakaoLogin = () => {
    // 1. 카카오 로그인 요청
  }

  const TextInputFields = () => {
    return (
      <View style={containerStyles.textInputContainer}>
        <MyTextInput
          iconName="person-circle"
          placeholder="아이디"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <MyTextInput
          iconName="lock-closed"
          placeholder="비밀번호"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
    );
  }

  const Buttons = () => {
    return (
      <View style={containerStyles.buttonContainer}>
        <LoginButton text="Login" onPress={handleLogin} kakao={false} />
        <View style={containerStyles.divider}>
          <Image
            source={require("../../assets/images/kakao_login_large.png")}
            style={containerStyles.loginButton}
          />
          <Image
            source={require("../../assets/images/btnG_축약형.png")}
            style={containerStyles.loginButton}
          />
        </View>
        <View style={containerStyles.textButtonContainer}>
          <TextButton
            text="비밀번호 찾기"
            onPress={() => console.log("비밀번호 찾기")}
          />
          <TextButton
            text="회원가입"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={containerStyles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      enabled
    >
      <LoginLogo />
      <TextInputFields />
      <Buttons />
    </KeyboardAvoidingView>
  );
}
