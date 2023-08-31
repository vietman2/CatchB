import { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
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
        <LoginButton
          text="Login"
          onPress={() => console.log("로그인")}
          kakao={false}
        />
        <LoginButton
          text="카카오 계정으로 로그인"
          onPress={() => console.log("카카오로그인")}
          kakao={true}
        />
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
