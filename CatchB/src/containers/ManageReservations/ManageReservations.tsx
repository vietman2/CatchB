import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import CheckReservations from "../../components/Reservations/CheckReservations";
import { themeColors } from "../../variables/colors";
import {
  newReservations,
  cancelledReservations,
  finishedReservations,
  confirmedReservations,
} from "../../variables/mvp_dummy_data/reservations";

export default function ManageReservations() {
  const [tab, setTab] = useState("New");

  const render = () => {
    if (tab === "New") {
      return <CheckReservations tab={tab} reservations={newReservations} />;
    }
    else if (tab === "Pending") {
      return (
        <CheckReservations tab={tab} reservations={confirmedReservations} />
      );
    } else if (tab === "Cancelled") {
      return (
        <CheckReservations tab={tab} reservations={cancelledReservations} />
      );
    } else if (tab === "Completed") {
      return (
        <CheckReservations tab={tab} reservations={finishedReservations} />
      );
    }
    else return null;
  };

  return (
    <View>
      <View style={styles.topTabs}>
        <TouchableOpacity
          onPress={() => setTab("New")}
          style={tab === "New" ? styles.activeTab : styles.inactiveTab}
        >
          <Text variant="titleLarge" style={styles.tabText}>
            신규
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab("Pending")}
          style={tab === "Pending" ? styles.activeTab : styles.inactiveTab}
        >
          <Text variant="titleLarge" style={styles.tabText}>
            확정
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab("Cancelled")}
          style={tab === "Cancelled" ? styles.activeTab : styles.inactiveTab}
        >
          <Text variant="titleLarge" style={styles.tabText}>
            취소
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab("Completed")}
          style={tab === "Completed" ? styles.activeTab : styles.inactiveTab}
        >
          <Text variant="titleLarge" style={styles.tabText}>
            완료
          </Text>
        </TouchableOpacity>
      </View>
      {render()}
    </View>
  );
}

const styles = StyleSheet.create({
  topTabs: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tabText: {
    fontWeight: "bold",
  },
  activeTab: {
    flex: 1,
    alignItems: "center",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: themeColors.tertiary,
  },
  inactiveTab: {
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: themeColors.tertiary,
  },
});
