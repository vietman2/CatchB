import { StyleSheet, Text, View } from "react-native";

interface Props {
  description: string;
}

export default function Subheading({ description }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  description: {},
});
