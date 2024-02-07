import { ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

import { themeColors } from "../../../variables/colors";

export default function FacilityStep4() {
  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets
      keyboardDismissMode="on-drag"
    >
      <Text variant="titleLarge" style={styles.title}>
        가격 정보
      </Text>
      <Text variant="titleSmall" style={styles.description}>
        상품의 가격을 구체적으로 작성하면 메인에 상위 노출돼요!
      </Text>
      <Text variant="titleMedium" style={styles.subtitle}>
        대관 가격
      </Text>
      <Button mode="text" icon="plus-circle">
        상품 가격 정보 추가하기
      </Button>
      <Button
        mode="contained"
        style={{ marginTop: 10, marginBottom: 20 }}
        onPress={() => {}}
      >
        완료 (3/3)
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
