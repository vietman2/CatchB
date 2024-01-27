import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";

import TodoBox from "../Todo/TodoBox";
import TodoList from "../Todo/TodoList";
import {
  closeTodos,
  middleTodos,
  openTodos,
} from "../../../variables/mvp_dummy_data/todos";

export default function WorkProgress() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleBox}>
        <Text variant="headlineSmall">업무 리스트</Text>
      </View>
      <TodoBox title="오픈 업무" todos={openTodos} />
      <TodoBox title="미들 업무" todos={middleTodos} />
      <TodoBox title="마감 업무" todos={closeTodos} />
      <TodoList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleBox: {
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
  },
});
