import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Text } from "react-native-paper";

import Welcome from "../../../components/BottomSheets/Welcome";
import { RootState } from "../../../store/store";

export default function NormalHome() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <View style={styles.ads}>
        <Text variant="displayMedium" style={{ color: "yellow" }}>
          일반모드
        </Text>
      </View>
      <Welcome text={user === null ? "로그인좀해라" : "왔냐?"} />
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
  labelText: {
    fontSize: 18,
    color: "black",
  },
});
