import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";

import TodoBox from "../Todo/TodoBox";
import TodoList from "../Todo/TodoList";

const openTodos = [
  {
    id: 1,
    title: "매장 내부 - 재고관리",
    done: true,
  },
  {
    id: 2,
    title: "매장 내부 - 최종 세팅",
    done: true,
  },
  {
    id: 3,
    title: "매장 외부 - 쓰레기 줍기",
    done: true,
  },
  {
    id: 4,
    title: "데스크 점검",
    done: false,
  },
];

const middleTodos = [
  {
    id: 1,
    title: "매장 내부 - 물건 정리",
    done: true,
  },
  {
    id: 2,
    title: "매장 내부 - 쓰레기 줍기",
    done: true,
  },
  {
    id: 3,
    title: "매장 외부 - 소독",
    done: false,
  },
  {
    id: 4,
    title: "데스크 점검",
    done: false,
  },
];

const closeTodos = [
  {
    id: 1,
    title: "매장 내부 - 물건 청소",
    done: true,
  },
  {
    id: 2,
    title: "매장 내부 - 데스크 정리",
    done: false,
  },
  {
    id: 3,
    title: "매장 외부 - 마감",
    done: false,
  },
  {
    id: 4,
    title: "데스크 정리",
    done: false,
  },
];

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
