import { useRef, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

import { RootState } from "../../../store/store";

export default function NormalHome() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["3%", "50%"], []);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <View style={styles.ads}>
        <Text variant="displayMedium" style={{ color: "yellow" }}>
          일반모드
        </Text>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        <Text variant="displaySmall">{user === null ? "로그인좀해라" : "왔냐?"}</Text>
      </BottomSheet>
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
  bottomSheet: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
