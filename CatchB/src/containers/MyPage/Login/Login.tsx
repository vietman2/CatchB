import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Divider, Text, TextInput } from "react-native-paper";

import { NaverButton, KakaoButton } from ".components/Buttons";
import { LoadingComponent } from ".components/Loading";
import { LoginLogo } from ".components/Logos";
import { MyPageScreenProps } from ".constants/navigation";
import { login } from ".services/user_management";
import { AppDispatch } from ".store/index";
import { login as setUserState } from ".store/user_management/authSlice";
import { themeColors } from ".themes/colors";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<MyPageScreenProps<"Login">["navigation"]>();

  const handleLogin = async () => {
    setIsLoading(true);

    const response = await login(username, password);

    if (response.status === 200) {
      setError("");
      await dispatch(setUserState(response.data));
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
            left={<TextInput.Icon icon="account-outline" color="green" />}
            style={{ marginVertical: 5 }}
            testID="username-input"
          />
          <TextInput
            label="비밀번호"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!isPasswordVisible}
            left={<TextInput.Icon icon="lock-outline" color="green" />}
            right={
              <TextInput.Icon
                icon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                color="green"
                onPress={onPressEyeIcon}
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
            <LoadingComponent />
          ) : (
            <Button
              mode="contained"
              onPress={handleLogin}
              labelStyle={styles.buttonText}
              testID="login-button"
            >
              로그인
            </Button>
          )}
          <View style={styles.textButtonContainer}>
            <Button
              mode="text"
              onPress={() =>
                setError("아이디 찾기 기능은 아직 구현되지 않았습니다")
              }
              labelStyle={styles.textButton}
            >
              아이디 찾기
            </Button>
            <Button
              mode="text"
              onPress={() =>
                setError("비밀번호 찾기 기능은 아직 구현되지 않았습니다")
              }
              labelStyle={styles.textButton}
            >
              비밀번호 찾기
            </Button>
          </View>
          <Divider />
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
          <Button
            mode="contained"
            onPress={() => navigation.navigate("SignUp")}
            labelStyle={styles.buttonText}
            testID="sign-up-button"
          >
            회원가입
          </Button>
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
  textButton: {
    color: "black",
    fontSize: 20,
  },
  buttonText: {
    fontFamily: "Catch B ExtraBold",
    fontSize: 16,
    paddingVertical: 2,
  },
});
