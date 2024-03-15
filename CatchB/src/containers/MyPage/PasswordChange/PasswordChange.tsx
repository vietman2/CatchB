import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";

import { MyPageScreenProps } from ".constants/navigation";
import { changePassword, logout } from ".services/user_management";
import { AppDispatch, RootState } from ".store/index";
import { get } from ".store/storage/secure";
import { logout as resetUserState } from ".store/user_management/authSlice";
import { themeColors } from ".themes/colors";

export default function PasswordChange() {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordCheck, setNewPasswordCheck] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<MyPageScreenProps<"PasswordChange">["navigation"]>();

  const handlePasswordChangeSuccess = async () => {
    get("refresh_token").then(async (token) => {
      if (token) {
        const response = await logout(token);
        if (response.status === 200) {
          navigation.navigate("MyPageScreen");
          await dispatch(resetUserState());
          Alert.alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
        } else {
          Alert.alert("로그아웃에 실패했습니다.");
        }
      } else {
        Alert.alert("로그아웃에 실패했습니다2.");
      }
    });
  };

  const handleButton = async () => {
    setIsLoading(true);

    if (oldPassword === "") {
      setError("현재 비밀번호를 입력해주세요.");
      setIsLoading(false);
      return;
    }
    if (newPassword === "") {
      setError("새 비밀번호를 입력해주세요.");
      setIsLoading(false);
      return;
    }
    if (newPasswordCheck === "") {
      setError("새 비밀번호 확인을 입력해주세요.");
      setIsLoading(false);
      return;
    }

    const response = await changePassword(
      user.uuid,
      token,
      oldPassword,
      newPassword,
      newPasswordCheck
    );

    if (response.status === 200) {
      setError("");
      setIsLoading(false);
      setOldPassword("");
      setNewPassword("");
      setNewPasswordCheck("");
      handlePasswordChangeSuccess();
    } else if (response.status === 400) {
      const error = response.data.errors;
      if (error.old_password) {
        setError(error.old_password[0]);
      } else if (error.new_password1) {
        setError(error.new_password1[0]);
      } else if (error.new_password2) {
        setError(error.new_password2[0]);
      } else if (error.non_field_errors) {
        setError(error.non_field_errors[0]);
      } else {
        setError("비밀번호 변경에 실패했습니다.");
      }
      setIsLoading(false);
    } else {
      setError("비밀번호 변경에 실패했습니다.");
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text variant="titleLarge" style={styles.titleText}>
          비밀번호 변경
        </Text>
      </View>
      <View style={styles.box}>
        <TextInput
          label="아이디"
          mode="flat"
          value={user ? user.username : ""}
          editable={false}
          style={styles.textInput}
        />
        <TextInput
          label="현재 비밀번호"
          placeholder="현재 비밀번호를 입력해주세요."
          mode="flat"
          value={oldPassword}
          onChangeText={(text) => setOldPassword(text)}
          secureTextEntry={true}
          style={styles.textInput}
          testID="password-input"
        />
        <TextInput
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해주세요."
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          mode="flat"
          secureTextEntry={true}
          style={styles.textInput}
          testID="new-password-input"
        />
        <TextInput
          label="새 비밀번호 확인"
          placeholder="새 비밀번호를 다시 입력해주세요."
          mode="flat"
          value={newPasswordCheck}
          onChangeText={(text) => setNewPasswordCheck(text)}
          secureTextEntry={true}
          style={styles.textInput}
          testID="new-password-check-input"
        />
        <View style={{ alignItems: "flex-end" }}>
          {error ? (
            <Text style={styles.errorText} testID="error-text">
              {error}
            </Text>
          ) : null}
        </View>
        <View style={styles.buttonBox}>
          {isLoading ? (
            <ActivityIndicator animating={true} color={themeColors.primary} />
          ) : (
            <Button mode="contained" onPress={handleButton}>
              확인
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
  },
  box: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  titleText: {
    fontWeight: "bold",
  },
  textInput: {
    marginVertical: 5,
  },
  buttonBox: {
    marginTop: 20,
  },
  errorText: {
    color: themeColors.error,
  },
});
