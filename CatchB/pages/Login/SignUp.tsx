import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import { MyTextInput } from "../../components/TextInput";
import { LoginButton } from "../../components/Buttons";
import { LoginLogo } from "../../components/Icons";

import { containerStyles } from "./styles";

export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  const TextInputFields = () => {
    return (
      <View style={ {...containerStyles.textInputContainer, marginTop: -30 }}>
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
        />
        <MyTextInput
          placeholder="비밀번호 확인"
          onChangeText={(text) => setPasswordCheck(text)}
          value={passwordCheck}
        />
      </View>
    )
  }

  const Buttons = () => {
    return (
      <View style={containerStyles.buttonContainer}>
        <LoginButton
          text="회원가입"
          onPress={() => console.log("회원가입")}
          kakao={false}
        />
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
