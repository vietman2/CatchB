import { useState } from "react";
import { View, KeyboardAvoidingView, Platform, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { styles } from "./styles";
import { MyTextInput } from "../../components/TextInput";
import { LoginButton, TextButton, PortalLoginButton } from "../../components/Buttons";
import { LoginLogo } from "../../components/Icons";
import { RootStackParamList } from "../../containers/BaseContainer";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = () => {
    // 1. username, password 유효성 검사
    // 2. 로그인 요청
    // 3. 로그인 성공 시, 메인 페이지로 이동
    // 4. 로그인 실패 시, 실패 메시지 출력
    setError("로그인 기능은 아직 구현되지 않았습니다.");
  }

  const handleKakaoLogin = () => {
    // 1. 카카오 로그인 요청
    setError("카카오 로그인 기능은 아직 구현되지 않았습니다.");
  }

  const handleNaverLogin = () => {
    // 1. 네이버 로그인 요청
    setError("네이버 로그인 기능은 아직 구현되지 않았습니다.");
  }

  const TextInputFields = () => {
    return (
      <View style={styles.textInputContainer}>
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
          secureTextEntry={true}
        />
      </View>
    );
  }

  const Buttons = () => {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <LoginButton text="Login" onPress={handleLogin} />
        <View style={styles.divider}>
          <PortalLoginButton kakao={true} onPress={handleKakaoLogin} />
          <PortalLoginButton kakao={false} onPress={handleNaverLogin} />
        </View>
        <View style={styles.textButtonContainer}>
          <TextButton
            text="비밀번호 찾기"
            onPress={() => setError("비밀번호 찾기 기능은 아직 구현되지 않았습니다")}/*() => navigation.navigate("FindPassword")*/
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
      style={styles.mainContainer}
      behavior={"padding"}
    >
      <LoginLogo />
      <TextInputFields />
      <Buttons />
    </KeyboardAvoidingView>
  );
}
