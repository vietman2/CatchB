import { StyleSheet } from "react-native";
import { Icon, Surface, Text } from "react-native-paper";

interface Props {
  icon: string;
  title: string;
}

export default function SurfaceButton({ icon, title }: Readonly<Props>) {
  return (
    <Surface elevation={4} style={styles.surface}>
      <Icon source={icon} size={45} />
      <Text variant="titleLarge" style={styles.text}>
        {title}
      </Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    marginTop: 10,
  },
});
