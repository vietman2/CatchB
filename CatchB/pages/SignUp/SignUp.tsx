import { useState } from "react";
import { KeyboardAvoidingView, View, Text } from "react-native";

import { MyTextInput } from "../../components/TextInput";
import { LoginButton } from "../../components/Buttons";
import { LoginLogo } from "../../components/Icons";
import { styles } from "../Login/styles";

export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignUp = () => {
    // 1. username, email, password, passwordCheck 유효성 검사
    if (username === "") {
      setError("아이디를 입력해주세요.");
      return;
    } else if (email === "") {
      setError("이메일을 입력해주세요.");
      return;
    } else if (password === "") {
      setError("비밀번호를 입력해주세요.");
      return;
    } else if (passwordCheck === "") {
      setError("비밀번호 확인을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 2. 회원가입 요청
    //setError("");
    setError("회원가입 기능은 아직 구현되지 않았습니다.");

    // 3. 회원가입 성공 시, 로그인 페이지로 이동
    // 4. 회원가입 실패 시, 실패 메시지 출력
  };

  const TextInputFields = () => {
    return (
      <View style={{ ...styles.textInputContainer, marginTop: -30 }}>
        <MyTextInput
          placeholder="아이디"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <MyTextInput
          placeholder="이메일"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <MyTextInput
          placeholder="비밀번호"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <MyTextInput
          placeholder="비밀번호 확인"
          onChangeText={(text) => setPasswordCheck(text)}
          value={passwordCheck}
          secureTextEntry={true}
        />
      </View>
    );
  };

  const Buttons = () => {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <LoginButton text="회원가입" onPress={handleSignUp} />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer} behavior={"position"}>
      <LoginLogo />
      <TextInputFields />
      <Buttons />
    </KeyboardAvoidingView>
  );
}
