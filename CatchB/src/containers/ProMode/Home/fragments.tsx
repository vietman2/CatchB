import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

interface ChipProps {
  color: string;
  icon: string;
  title: string;
  content: string;
}

function Chip({ color, icon, title, content }: Readonly<ChipProps>) {
  return (
    <View
      style={[
        styles.notificationChip,
        {
          backgroundColor: color,
        },
      ]}
    >
      <Icon source={icon} size={24} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: "gray", marginBottom: 5 }}>{title}</Text>
        <Text>{content}</Text>
      </View>
    </View>
  );
}

interface Props {
  type: "store" | "worker" | "reservation";
  label: string;
}

export function NotificationChip({ type, label }: Readonly<Props>) {
  if (type === "store") {
    return (
      <Chip
        color="rgba(64, 196, 20, 0.35)"
        icon="store-check"
        title="가게관리"
        content={label}
      />
    );
  } else if (type === "worker") {
    return (
      <Chip
        color="rgba(57, 167, 255, 0.35)"
        icon="table-account"
        title="직원관리"
        content={label}
      />
    );
  } else {
    return (
      <Chip
        color="rgba(255, 167, 57, 0.35)"
        icon="calendar"
        title="예약관리"
        content={label}
      />
    );
  }
}

const styles = StyleSheet.create({
  notificationChip: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
  },
});
