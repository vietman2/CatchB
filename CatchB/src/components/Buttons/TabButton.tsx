import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Icon } from "react-native-paper";

interface Props {
  title: string;
  detail: string;
  onPress?: () => void;
  paddingVertical?: number;
}

export default function TabButton({
  title,
  detail,
  onPress,
  paddingVertical,
}: Props) {
  return (
    <TouchableOpacity
      style={{ ...styles.tab, paddingVertical: paddingVertical }}
      onPress={onPress}
    >
      <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
        {title}
      </Text>
      <View style={styles.tabRight}>
        <Text variant="titleMedium">{detail}</Text>
        {onPress && <Icon size={20} source="chevron-right" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    paddingLeft: 10,
  },
  tabRight: {
    flexDirection: "row",
    alignItems: "center",
  },
});
