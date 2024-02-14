import { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import StoreDashboard from "../StoreDashboard/StoreDashboard";
import TaskBoard from "../TaskBoard/TaskBoard";
import ManageReservations from "../ManageReservations/ManageReservations";
import Sales from "../Sales/Sales";
import ManageCustomers from "../Customers/ManageCustomers";
import { themeColors } from "../../../variables/colors";

export default function MyStoreMain() {
  const [mode, setMode] = useState<"Dashboard" | 
  "Tasks" | "Reservations" | "Sales" | "Customers">("Dashboard");

  const render = () => {
    if (mode === "Dashboard") {
      return <StoreDashboard />;
    } else if (mode === "Sales") {
      return <Sales />;
    } else if (mode === "Reservations") {
      return <ManageReservations />;
    } else if (mode === "Tasks") {
      return <TaskBoard />;
    } else if (mode === "Customers") {
      return <ManageCustomers />;
    } else {
      return null;
    }
  };

  return (
    <View>
      <ScrollView horizontal style={styles.view}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setMode("Dashboard")}
            style={mode === "Dashboard" ? styles.active : styles.box}
          >
            <Text style={mode === "Dashboard" ? styles.activeText : {}}>
              대시보드
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMode("Sales")}
            style={mode === "Sales" ? styles.active : styles.box}
          >
            <Text style={mode === "Sales" ? styles.activeText : {}}>
              매출관리
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMode("Reservations")}
            style={mode === "Reservations" ? styles.active : styles.box}
          >
            <Text style={mode === "Reservations" ? styles.activeText : {}}>
              예약관리
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMode("Tasks")}
            style={mode === "Tasks" ? styles.active : styles.box}
          >
            <Text style={mode === "Tasks" ? styles.activeText : {}}>
              업무관리
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMode("Customers")}
            style={mode === "Customers" ? styles.active : styles.box}
          >
            <Text style={mode === "Customers" ? styles.activeText : {}}>
              고객관리
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {render()}
    </View>
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
  activeText: {
    fontWeight: "bold",
  },
});
