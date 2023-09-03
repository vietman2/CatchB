import { Text, View, StyleSheet } from "react-native";

interface Props {
  title: string;
}

export default function Heading({ title }: Props) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 15,
    borderColor: "green",
    borderWidth: 3,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 3,
    fontFamily: "KBO Dia Gothic_medium"
  },
});
