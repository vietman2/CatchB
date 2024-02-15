import { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import GenderButton from "../../../components/Buttons/GenderButton";
import { login, register } from "../../../services/user_management/account";
import { AppDispatch } from "../../../store/store";
import { login as setUserState } from "../../../store/slices/user_management/authSlice";
import { themeColors } from "../../../variables/colors";
import { MyPageStackScreenProps } from "../../../variables/navigation";

export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<"M" | "F" | "N">("N");

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordCheckVisible, setIsPasswordCheckVisible] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigation =
    useNavigation<MyPageStackScreenProps<"SignUp">["navigation"]>();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignUpSuccess = async () => {
    const response = await login(username, password);

    if (response.status === 200) {
      await dispatch(setUserState(response.data));
      navigation.navigate("MyPageScreen");
      Alert.alert("회원가입이 완료되었습니다.", "환영합니다.");
    } else {
      navigation.navigate("Login");
      Alert.alert("회원가입이 완료되었습니다.", "로그인 페이지로 이동합니다.");
    }
  };

  const handleSignUp = async () => {
    if (gender === "N") {
      setError("성별을 선택해주세요.");
      return;
    }

    const response = await register(
      {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        password,
        password2: passwordCheck,
      },
      gender
    );

    if (response.status === 201) {
      setError("");
      handleSignUpSuccess();
    } else {
      const errors = response.data.errors;
      if (errors.username) {
        setError(errors.username[0]);
      } else if (errors.email) {
        setError(errors.email[0]);
      } else if (errors.first_name) {
        setError(errors.first_name[0]);
      } else if (errors.last_name) {
        setError(errors.last_name[0]);
      } else if (errors.phone_number) {
        setError(errors.phone_number[0]);
      } else {
        setError(errors.password[0]);
      }
    }
  };

  const onPressEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);
  const onPressEyeIcon2 = () =>
    setIsPasswordCheckVisible(!isPasswordCheckVisible);

  function PasswordShowIcon() {
    return (
      <MaterialCommunityIcons
        name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
        size={24}
        color={themeColors.primary}
        onPress={onPressEyeIcon}
        testID="password-eye-icon"
      />
    );
  }

  function PasswordCheckShowIcon() {
    return (
      <MaterialCommunityIcons
        name={isPasswordCheckVisible ? "eye-off-outline" : "eye-outline"}
        size={24}
        color={themeColors.primary}
        onPress={onPressEyeIcon2}
        testID="password-check-eye-icon"
      />
    );
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <KeyboardAvoidingView behavior="height">
        <View style={styles.container}>
          <Text
            variant="displaySmall"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            회원가입
          </Text>
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
            right={<TextInput.Icon icon={PasswordShowIcon} />}
            style={{ marginVertical: 5 }}
            testID="password-input"
          />
          <TextInput
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력하세요."
            onChangeText={(text) => setPasswordCheck(text)}
            value={passwordCheck}
            secureTextEntry={!isPasswordCheckVisible}
            right={<TextInput.Icon icon={PasswordCheckShowIcon} />}
            style={{ marginVertical: 5 }}
            testID="password-check-input"
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
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
        <GenderButton gender={gender} setGender={setGender} />
        <View style={styles.button}>
          <Text style={styles.errorText}>{error}</Text>
          <Button
            mode="contained"
            onPress={handleSignUp}
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
    paddingHorizontal: 50,
  },
  container: {
    justifyContent: "center",
    marginTop: 60,
  },
  errorText: {
    color: themeColors.error,
    marginTop: 5,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Catch B ExtraBold",
    fontSize: 16,
    paddingVertical: 2,
  },
});
