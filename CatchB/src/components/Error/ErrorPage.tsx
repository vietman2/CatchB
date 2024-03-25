import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  onRefresh?: () => void;
}

export default function ErrorPage({ onRefresh }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      {/* TODO: 아이콘이나 이미지 추가하기 */}
      <Text variant="headlineSmall">오류가 발생했습니다.</Text>
      <Text variant="titleMedium">잠시 후 다시 시도해주세요.</Text>
      {onRefresh && (
        <TouchableOpacity onPress={onRefresh} style={styles.button}>
          <Text variant="titleMedium">새로고침</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },
});
