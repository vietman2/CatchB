import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";

interface Props {
  title: string;
  content: string;
  type: number;
  actionText?: string;
  action?: () => void;
  icon?: string;
  chip?: string;
}

export function HomeCard(props: Readonly<Props>) {
  const getBackgroundColor = () => {
    switch (props.type) {
      case 1:
        return "rgba(64, 196, 20, 0.85)";
      case 2:
        return "rgba(80, 80, 80, 0.85)";
      case 3:
        return "rgba(20, 64, 196, 0.85)";
      default:
        return "rgba(196, 64, 20, 0.85)";
    }
  };

  const getMainColor = () => {
    switch (props.type) {
      case 1:
        return "black";
      case 2:
        return "white";
      case 3:
        return "yellow";
      default:
        return "blue";
    }
  };

  const getSubColor = () => {
    switch (props.type) {
      case 1:
        return "white";
      case 2:
        return "yellow";
      case 3:
        return "white";
      default:
        return "lightblue";
    }
  };

  return (
    <View
      style={[
        styles.mainCard,
        {
          backgroundColor: getBackgroundColor(),
        },
      ]}
    >
      <Text
        variant="titleLarge"
        style={[styles.title, { color: getMainColor() }]}
      >
        {props.title}
      </Text>
      <Text
        variant="titleMedium"
        style={[styles.content, { color: getSubColor() }]}
      >
        {props.content}
      </Text>
      {props.action ? (
        <TouchableOpacity onPress={props.action} style={styles.action}>
          <Text variant="titleMedium" style={{ color: getSubColor() }}>
            {props.actionText}
          </Text>
          <Icon source="chevron-right" size={20} color={getSubColor()} />
        </TouchableOpacity>
      ) : null}
      {props.icon ? (
        <View style={styles.icon}>
          <Icon source={props.icon} size={36} color={getSubColor()} />
        </View>
      ) : null}
      {props.chip ? (
        <View style={styles.chip}>
          <Text variant="bodyLarge" style={{ color: getSubColor() }}>
            {props.chip}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    margin: 10,
    marginRight: 5,
    borderRadius: 10,
    elevation: 5,
    paddingRight: 10,
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
  },
  icon: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },
  title: {
    fontFamily: "Catch B Bold",
    marginTop: 20,
    marginLeft: 15,
  },
  content: {
    marginTop: 5,
    marginLeft: 15,
  },
  action: {
    position: "absolute",
    bottom: 20,
    left: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  chip: {
    position: "absolute",
    bottom: 15,
    left: 15,
    backgroundColor: "gray",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
  },
});
