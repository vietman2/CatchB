import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CheckStatus, ProgressBanner } from "../../components/Progress";
import { useNavigation } from "@react-navigation/native";
import { MyStoreStackScreenProps } from "../../variables/navigation";

export default function TaskBoard() {
  const navigation =
    useNavigation<MyStoreStackScreenProps<"MyStoreScreen">["navigation"]>();

  return (
    <View style={styles.container}>
      <ProgressBanner done={2} total={4} />
      <TouchableOpacity onPress={() => navigation.navigate("WorkProgress")}>
        <CheckStatus done={2} total={4} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
