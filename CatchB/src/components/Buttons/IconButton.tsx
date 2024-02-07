import { View, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-paper";

import { themeColors } from "../../variables/colors";

interface Props {
  icon: string;
  title: string;
}

export default function IconButton({ icon, title }: Readonly<Props>) {
  return (
    <View style={styles.container}>
      <Icon source={icon} size={20} color={themeColors.primary} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    marginTop: 5,
  },
});
