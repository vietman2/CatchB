import { StyleSheet, Text, View } from "react-native";

interface Props {
  description: string;
}

export default function Subheading({ description }: Props) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.container}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
  },
  description: {
    fontFamily: "KBO Dia Gothic_bold",
    fontSize: 14,
    color: "gray",
  },
});
