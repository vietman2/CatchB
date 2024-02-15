import { Dimensions, StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

interface Props {
  title: string;
  content: string;
  icon?: string;
  iconColor?: string;
}

export default function StatsCard(props: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title} variant="titleLarge">
        {props.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {props.icon && (
          <Icon source={props.icon} size={20} color={props.iconColor} />
        )}
        <Text style={styles.content} variant="titleLarge">
          {props.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  title: {
    fontWeight: "bold",
  },
  content: {
    fontWeight: "bold",
  },
});
