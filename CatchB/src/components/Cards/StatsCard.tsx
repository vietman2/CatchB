import { Dimensions, StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

interface StatsProps {
  title: string;
  content: string;
  icon?: string;
  iconColor?: string;
}

export function StatsCard(props: StatsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.bold} variant="titleLarge">
        {props.title}
      </Text>
      <View style={styles.content}>
        {props.icon ? (
          <Icon source={props.icon} size={20} color={props.iconColor} />
        ) : null}
        <Text style={styles.bold} variant="titleLarge">
          {props.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.3,
    height: 100,
    padding: 15,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "white",
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
