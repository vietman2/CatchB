import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  text: string;
  sub?: string;
}

export function MainTitle({ text, sub }: Readonly<Props>) {
  return (
    <>
      <Text variant="headlineSmall" style={styles.title}>
        {text}
      </Text>
      {sub && (
        <Text variant="titleMedium" style={styles.description}>
          {sub}
        </Text>
      )}
    </>
  );
}

export function SubTitle({ text, sub }: Readonly<Props>) {
  return (
    <Text style={styles.subtitle}>
      {text}
      {sub && <Text variant="titleSmall">{sub}</Text>}
    </Text>
  );
}

export function DisabledTextInput({ text }: Readonly<Props>) {
  return (
    <View style={styles.disabled}>
      <Text variant="titleMedium">{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  description: {
    marginBottom: 5,
    color: "gray",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "rgba(192, 192, 192, 0.15)",
    height: 40,
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 5,
  },
});
