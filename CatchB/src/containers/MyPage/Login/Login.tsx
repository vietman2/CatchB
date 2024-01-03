import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Divider,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import LoginLogo from "../../../components/Logos/LoginLogo";
import NaverButton from "../../../components/Buttons/NaverButton";
import KakaoButton from "../../../components/Buttons/KakaoButton";
import DividerWithText from "../../../components/Divider/DividerWithText";
import LoginButton from "../../../components/Buttons/LoginButton";
import TextButton from "../../../components/Buttons/TextButton";
import { MyPageStackParamList } from "../../../variables/navigation";
import { login } from "../../../services/account";
import { login as setUserState } from "../../../store/slices/authSlice";
import { AppDispatch } from "../../../store/store";
import { themeColors } from "../../../variables/colors";

type LoginNavigationProp = StackNavigationProp<MyPageStackParamList, "Login">;
interface LoginProps {
  navigation: LoginNavigationProp;
}

export default function Login({ navigation }: LoginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    setIsLoading(true);

    const response = await login(username, password);

    if (response.status === 200) {
      setError("");
      dispatch(setUserState(response.data));
      navigation.navigate("MyPageScreen");
    } else if (response.status === 400) {
      const error = response.data;
      if (error.password) {
        setError("비밀번호를 입력해주세요.");
      } else if (error.non_field_errors[0].includes("username")) {
        setError("아이디를 입력해주세요.");
      } else {
        setError("아이디와 비밀번호를 확인해주세요.");
      }
    } else {
      setError("서버와의 연결이 원활하지 않습니다.");
    }
    setIsLoading(false);
  };

  const handleKakaoLogin = () => {
    // 1. 카카오 로그인 요청
    setError("카카오 로그인 기능은 아직 구현되지 않았습니다.");
  };

  const handleNaverLogin = () => {
    // 1. 네이버 로그인 요청
    setError("네이버 로그인 기능은 아직 구현되지 않았습니다.");
  };

  const onPressEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <ScrollView style={styles.mainContainer}>
      <KeyboardAvoidingView behavior="height">
        <LoginLogo />
        <View style={styles.container}>
          <TextInput
            label="이메일"
            onChangeText={(text) => setUsername(text)}
            value={username}
            left={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={24}
                    color={themeColors.primary}
                  />
                )}
              />
            }
            style={{ marginVertical: 5 }}
            testID="username-input"
          />
          <TextInput
            label="비밀번호"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!isPasswordVisible}
            left={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={24}
                    color={themeColors.primary}
                  />
                )}
              />
            }
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
        </View>
        <View style={{ alignItems: "flex-end" }}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator animating={true} color={themeColors.primary} />
          ) : (
            <LoginButton
              text="로그인"
              onPress={handleLogin}
              testID="login-button"
            />
          )}
          <View style={styles.textButtonContainer}>
            <TextButton
              text="아이디 찾기"
              onPress={() =>
                setError("아이디 찾기 기능은 아직 구현되지 않았습니다")
              }
            />
            <TextButton
              text="비밀번호 찾기"
              onPress={() =>
                setError("비밀번호 찾기 기능은 아직 구현되지 않았습니다")
              }
            />
          </View>
          <DividerWithText text="간편 로그인" />
          <TouchableOpacity onPress={handleKakaoLogin} testID="kakao-button">
            <KakaoButton />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNaverLogin} testID="naver-button">
            <NaverButton />
          </TouchableOpacity>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.container}>
          <Text style={styles.registerText}>
            아직{" "}
            <Text
              style={{ ...styles.registerText, color: themeColors.primary }}
            >
              Catch B{" "}
            </Text>
            회원이 아니신가요?
          </Text>
          <LoginButton
            text="회원가입"
            onPress={() => navigation.navigate("SignUp")}
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
    marginTop: 20,
    marginBottom: 10,
  },
  textButtonContainer: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  registerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  errorText: {
    color: themeColors.error,
    marginHorizontal: 50,
    marginTop: 5,
  },
  divider: {
    marginVertical: 10,
    marginHorizontal: 50,
  },
});
