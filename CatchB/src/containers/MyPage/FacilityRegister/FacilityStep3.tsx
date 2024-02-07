import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Icon, Text } from "react-native-paper";

import { themeColors } from "../../../variables/colors";

interface Props {
  onFinish: () => void;
}

export default function FacilityStep3({ onFinish }: Props) {
  const handleSubmitSuccess = () => {
    onFinish();
  };
/*
  const handleNext = () => {
    //TODO: API 연동
  };
*/
  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets
      keyboardDismissMode="on-drag"
    >
      <Text variant="titleLarge" style={styles.title}>
        계좌 정보
      </Text>
      <Text variant="titleSmall" style={styles.description}>
        정산액은 매주 월요일에 입금돼요!
      </Text>
      <Text variant="titleMedium" style={styles.subtitle}>
        계좌 정보
      </Text>
      <Button mode="text" icon="plus-circle">
        계좌 정보 추가하기
      </Button>
      <View style={styles.termsBox}>
        <Text>Catch B 시설 회원약관</Text>
        <View style={styles.terms}>
          <View style={styles.horizontal}>
            <Icon source="checkbox-blank-outline" size={16} />
            <Text> Catch B 안심 시설 정책 동의</Text>
            <Text style={styles.required}> (필수)</Text>
          </View>
          <Text>보기</Text>
        </View>
        <View style={styles.terms}>
          <View style={styles.horizontal}>
            <Icon source="checkbox-outline" size={16} />
            <Text> Catch B 개인정보 처리 방침</Text>
            <Text style={styles.required}> (필수)</Text>
          </View>
          <Text>보기</Text>
        </View>
      </View>
      <Button
        mode="contained"
        style={{ marginTop: 10, marginBottom: 20 }}
        onPress={handleSubmitSuccess}
      >
        완료 (2/3)
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  description: {
    marginBottom: 5,
    color: "gray",
  },
  termsBox: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
  },
  terms: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
  required: {
    color: "red",
  },
});
