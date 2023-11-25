import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Text } from "react-native-paper";

import { RootState } from "../store/store";

export default function Home() {
  const mode = useSelector((state: RootState) => state.mode.mode);

  if (mode === "basic") {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.ads}>
          <Text variant="displayMedium" style={{ color: "yellow" }}>
            광고
          </Text>
        </View>
      </ScrollView>
    );
  }
  else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.ads}>
          <Text variant="displayMedium" style={{ color: "yellow" }}>
            프로모드
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  ads: {
    marginTop: 20,
    backgroundColor: "blue",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
});
