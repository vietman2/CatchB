import { useState } from "react";
import { useDispatch } from "react-redux";
import { View, KeyboardAvoidingView, Text, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Checkbox } from "react-native-paper";

import { styles } from "./styles";
import { MyTextInput } from "../components/TextInput";
import {
  LoginButton,
  TextButton,
  KakaoLoginButton,
  NaverLoginButton,
} from "../components/Buttons";
import { LoginLogo } from "../components/Icons";
import { MyPageStackParamList } from "../variables/navigation";
import { login } from "../services/account";
import { login as setUserState } from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";

type LoginNavigationProp = StackNavigationProp<MyPageStackParamList, "Login">;
interface LoginProps {
  navigation: LoginNavigationProp;
}

export default function Login({ navigation }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    const response = await login(username, password);

    if (response.status === 200) {
      setError("");
      dispatch(setUserState(response.data));
      navigation.navigate("MyPageScreen");
    } else {
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleKakaoLogin = () => {
    // 1. 카카오 로그인 요청
    setError("카카오 로그인 기능은 아직 구현되지 않았습니다.");
  };

  const handleNaverLogin = () => {
    // 1. 네이버 로그인 요청
    setError("네이버 로그인 기능은 아직 구현되지 않았습니다.");
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <KeyboardAvoidingView behavior="position">
        <LoginLogo />
        <View style={styles.textInputContainer}>
          <MyTextInput
            iconName="person-circle"
            placeholder="아이디"
            onChangeText={(text) => {
              setUsername(text);
            }}
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
        <View style={styles.buttonContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.textButtonContainer}>
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => setChecked(!checked)}
              />
              <Text style={styles.checkboxText}>자동 로그인</Text>
            </View>

            <TextButton
              text="비밀번호 찾기"
              onPress={() =>
                setError("비밀번호 찾기 기능은 아직 구현되지 않았습니다")
              } /*() => navigation.navigate("FindPassword")*/
            />
            <TextButton
              text="회원가입"
              onPress={() => navigation.navigate("SignUp")}
            />
          </View>
          <LoginButton text="Login" onPress={handleLogin} />
          <View style={styles.divider}>
            <KakaoLoginButton onPress={handleKakaoLogin} />
            <NaverLoginButton onPress={handleNaverLogin} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
