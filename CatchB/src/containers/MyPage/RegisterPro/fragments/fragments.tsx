import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  text: string;
  sub?: string;
}

export function MainTitle({ text, sub }: Readonly<Props>) {
  const subExists = sub ? true : false;

  return (
    <>
      <Text variant="headlineSmall" style={styles.title}>
        {text}
      </Text>
      {subExists ? (
        <Text variant="titleMedium" style={styles.description}>
          {sub}
        </Text>
      ) : null}
    </>
  );
}

export function SubTitle({ text, sub }: Readonly<Props>) {
  const subExists = sub ? true : false;

  return (
    <Text style={styles.subtitle}>
      {text}
      {subExists ? <Text variant="titleSmall" style={{color: "gray"}}>{sub}</Text> : null}
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
