import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";

interface TabProps {
  title: string;
  detail: string;
  showArrow: boolean;
  onPress?: () => void;
  paddingVertical?: number;
}

export default function TabButton({
  title,
  detail,
  showArrow,
  onPress,
  paddingVertical,
}: Readonly<TabProps>) {
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
        {showArrow && <Icon size={20} source="chevron-right" />}
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
