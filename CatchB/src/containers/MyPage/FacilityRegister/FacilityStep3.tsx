import { ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

import { themeColors } from "../../../variables/colors";
import RegisterProTerms from "../../../components/Terms/RegisterProTerms";

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
      <RegisterProTerms />
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
});
