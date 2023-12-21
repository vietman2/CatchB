import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { themeColors } from "../../variables/colors";

interface Props {
  tab: string;
  onPress: (tab: string) => void;
}

export default function SegmentedButtons({ tab, onPress }: Props) {
  return (
    <ScrollView horizontal style={styles.view}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => onPress("Dashboard")}
          style={tab === "Dashboard" ? styles.active : styles.box}
        >
          <Text
            style={
              tab === "Dashboard" ? styles.activeText : styles.inactiveText
            }
          >
            대시보드
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress("Sales")}
          style={tab === "Sales" ? styles.active : styles.box}
        >
          <Text
            style={tab === "Sales" ? styles.activeText : styles.inactiveText}
          >
            매출관리
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress("Reservations")}
          style={tab === "Reservations" ? styles.active : styles.box}
        >
          <Text
            style={
              tab === "Reservations" ? styles.activeText : styles.inactiveText
            }
          >
            예약관리
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress("Tasks")}
          style={tab === "Tasks" ? styles.active : styles.box}
        >
          <Text
            style={tab === "Tasks" ? styles.activeText : styles.inactiveText}
          >
            업무관리
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress("Customers")}
          style={tab === "Customers" ? styles.active : styles.box}
        >
          <Text
            style={
              tab === "Customers" ? styles.activeText : styles.inactiveText
            }
          >
            고객관리
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: themeColors.primaryContainer,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
  },
  active: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    marginHorizontal: 5,
    backgroundColor: themeColors.secondaryContainer,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: themeColors.primary,
  },
  box: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    marginHorizontal: 5,
  },
  activeText: { fontWeight: "bold" },
  inactiveText: {},
});
