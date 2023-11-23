import { useState } from "react";
import { KeyboardAvoidingView, View, Text } from "react-native";

import { MyTextInput } from "../components/TextInput";
import { LoginButton } from "../components/Buttons";
import { LoginLogo } from "../components/Icons";
import { styles } from "./styles";

export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignUp = () => {
    // TODO: 백엔드와 연동
    setError("회원가입 기능은 아직 구현되지 않았습니다.");
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
