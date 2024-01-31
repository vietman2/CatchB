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
import {
  Divider,
  Text,
  TextInput,
  ActivityIndicator,
  Button,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import LoginLogo from "../../../components/Logos/LoginLogo";
import NaverButton from "../../../components/Buttons/NaverButton";
import KakaoButton from "../../../components/Buttons/KakaoButton";
import DividerWithText from "../../../components/Divider/DividerWithText";
import { login } from "../../../services/user_management/account";
import { login as setUserState } from "../../../store/slices/user_management/authSlice";
import { AppDispatch } from "../../../store/store";
import { MyPageStackScreenProps } from "../../../variables/navigation";
import { themeColors } from "../../../variables/colors";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<MyPageStackScreenProps<"Login">["navigation"]>();

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
