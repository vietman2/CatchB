import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { themeColors } from "../../variables/colors";

interface Props {
  text: string;
}

export default function DividerWithText({ text }: Props) {
  return (
    <View style={styles.divider}>
      <View style={styles.line} />
      <Text>{text}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: themeColors.secondaryContainer,
    alignSelf: "center",
    marginHorizontal: 5,
  },
});
