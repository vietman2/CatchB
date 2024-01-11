import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

import Welcome from "../../components/BottomSheets/Welcome";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function NormalHome() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <View style={styles.ads}>
        <Text variant="displayMedium" style={{ color: "yellow" }}>
          일반모드
        </Text>
      </View>
      <View style={styles.docs}>
        <Button mode="text" onPress={() => {}} labelStyle={styles.labelText}>
          개인정보 처리방침
        </Button>

        <Button mode="text" onPress={() => {}} labelStyle={styles.labelText}>
          이용약관
        </Button>

        <Button mode="text" onPress={() => {}} labelStyle={styles.labelText}>
          현재 버전 0.1.0
        </Button>
      </View>
      <Welcome text={user === null ? "로그인좀해라" : "왔냐"} />
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
  labelText: {
    fontSize: 18,
    color: "black",
  },
});
