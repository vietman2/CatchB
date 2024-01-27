import { useState } from "react";
import { View } from "react-native";

import StoreDashboard from "../StoreDashboard/StoreDashboard";
import TaskBoard from "../TaskBoard/TaskBoard";
import ManageReservations from "../ManageReservations/ManageReservations";
import Sales from "../Sales/Sales";
import ManageCustomers from "../Customers/ManageCustomers";
import MySegmentedButtons from "../../../components/Buttons/SegmentedButtons";

export default function MyStoreMain() {
  const [mode, setMode] = useState("Dashboard");

  const render = () => {
    if (mode === "Dashboard") {
      return <StoreDashboard />;
    } else if (mode === "Tasks") {
      return <TaskBoard />;
    } else if (mode === "Reservations") {
      return <ManageReservations />;
    } else if (mode === "Sales") {
      return <Sales />;
    } else if (mode === "Customers") {
      return <ManageCustomers />;
    } else {
      return null;
    }
  };

  return (
    <View>
      <MySegmentedButtons tab={mode} onPress={(value) => setMode(value)} />
      {render()}
    </View>
  );
}
