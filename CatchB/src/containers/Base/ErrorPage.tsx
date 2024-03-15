import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function ErrorPage() {
  return (
    <View style={styles.container}>
      {/* TODO: 아이콘이나 이미지 추가하기 */}
      <Text variant="headlineSmall">오류가 발생했습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
