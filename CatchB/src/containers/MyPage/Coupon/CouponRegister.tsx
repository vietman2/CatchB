import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, TextInput, Text, ActivityIndicator } from "react-native-paper";
import { useSelector } from "react-redux";

import { registerCoupon, checkStatus } from "../../../services/user_management/coupon";
import { RootState } from "../../../store/store";
import { themeColors } from "../../../variables/colors";

export default function CouponRegister() {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const access = useSelector((state: RootState) => state.auth.token);
  //const dispatch = useDispatch<AppDispatch>();

  const handleCodeInput = (text: string) => {
    const cleaned = text.replace(/[^a-zA-Z0-9]/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    let formatted = chunks.join("-");

    formatted = formatted.toUpperCase();
    formatted = formatted.substring(0, 19);

    setCode(formatted);
    setError("");
  };

  const handleRegister = async () => {
    setLoading(true);
    const response = await registerCoupon(code, access);

    if (response.status === 202) {
      setError("");

      const taskId = response.data.task_id;

      const taskResponse = await checkStatus(taskId, access);

      setInterval(async () => {
        if (taskResponse.status === 200) {
          setLoading(false);
        } else {
          setError("에러");
        }
      }, 2000);
    } else {
      setError(response.data.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.textInput}
            outlineStyle={{ borderColor: "black" }}
            cursorColor="black"
            value={code}
            onChangeText={(text) => handleCodeInput(text)}
            mode="outlined"
            showSoftInputOnFocus={true}
            contextMenuHidden={true}
            placeholder="쿠폰 코드를 입력해주세요"
            testID="coupon-register-text-input"
          />
          <View style={{ alignItems: "flex-end" }}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {loading ? (
            <ActivityIndicator size="small" color={themeColors.primary} />
          ) : (
            <Button
              onPress={handleRegister}
              mode="contained-tonal"
              style={styles.button}
              labelStyle={styles.buttonText}
              testID="coupon-register-button"
            >
              쿠폰 등록
            </Button>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
  },
  textInput: {
    marginTop: 20,
    backgroundColor: themeColors.primaryContainer,
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: themeColors.primary,
  },
  buttonText: {
    color: themeColors.primaryContainer,
    fontSize: 20,
  },
  errorText: {
    color: themeColors.error,
    marginTop: 5,
  },
});
