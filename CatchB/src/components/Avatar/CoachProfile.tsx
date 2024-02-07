import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import AvatarImage from "./AvatarImage";

interface Props {
  name: string;
}

export default function CoachProfile({ name }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <AvatarImage />
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 15,
  },
});
