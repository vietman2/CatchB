import { StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

interface Props {
  label: string;
}

export function PostTagChip({ label }: Readonly<Props>) {
  return (
    <Chip style={styles.chip} textStyle={styles.text} compact>
      {label}
    </Chip>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "green",
  },
  text: {
    color: "white",
  },
});
