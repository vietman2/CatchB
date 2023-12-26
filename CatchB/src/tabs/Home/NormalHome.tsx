import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { TextButton } from "../../components/Buttons/Buttons";

export default function NormalHome() {
  return (
    <>
      <View style={styles.ads}>
        <Text variant="displayMedium" style={{ color: "yellow" }}>
          일반모드
        </Text>
      </View>
      <View style={styles.docs}>
        <TextButton text="개인정보 처리방침" onPress={() => {}} />
        <TextButton text="이용약관" onPress={() => {}} />
        <TextButton text="현재 버전 0.1.0" onPress={() => {}} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ads: {
    marginTop: 20,
    backgroundColor: "blue",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },

  docs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});
