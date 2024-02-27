import { ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { themeColors } from "../../../../variables/colors";
import { MyPageStackScreenProps } from "../../../../variables/navigation";

export default function Prices() {
  const navigation =
    useNavigation<MyPageStackScreenProps<"RegisterPro">["navigation"]>();

  const handleSubmitSuccess = () => {
    navigation.navigate("MyPageScreen");
  };
  /*
  const handleDone = () => {
    // TODO: API 연동
  }; */

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
        가격을 구체적으로 작성하면 메인에 상위 노출돼요!
      </Text>
      <Text variant="titleMedium" style={styles.subtitle}>
        레슨 가격
      </Text>
      <Button
        mode="contained"
        style={{ marginTop: 10, marginBottom: 20 }}
        onPress={handleSubmitSuccess}
      >
        완료
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
