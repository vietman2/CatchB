import { View, StyleSheet } from "react-native";
import { Divider, Icon, ProgressBar, Text } from "react-native-paper";

import { themeColors } from "../../../variables/colors";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

interface Props {
  title: string;
  todos: Todo[];
}

export default function TodoBox({ title, todos }: Readonly<Props>) {
  const getRate = () => {
    let done = 0;
    let total = 0;
    todos.forEach((todo) => {
      if (todo.done) {
        done += 1;
      }
      total += 1;
    });

    return total === 0 ? 0 : done / total;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text variant="headlineSmall">{title}</Text>
          <Icon source="chevron-up" size={24} />
        </View>
        <ProgressBar progress={getRate()} color={themeColors.primary} />
        <Text variant="bodySmall" style={{ marginTop: 10 }}>
          {`${Math.round(getRate() * 100)}%`}
        </Text>
      </View>
      <Divider bold />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    width: "95%",
    borderRadius: 10,
    marginBottom: 10,
  },
  titleBox: {
    marginTop: 5,
    padding: 10,
  },
});
