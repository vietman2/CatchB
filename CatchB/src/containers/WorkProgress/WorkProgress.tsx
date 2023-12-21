import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import TodoBox from "../../components/TodoBox";
import { closeTodos, middleTodos, openTodos } from "../../variables/mvp_dummy_data/todos";

export default function WorkProgress() {
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text variant="headlineSmall">업무 리스트</Text>
      </View>
      <TodoBox title="오픈 업무" todos={openTodos} />
      <TodoBox title="미들 업무" todos={middleTodos} />
      <TodoBox title="마감 업무" todos={closeTodos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleBox: {
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
  },
});
