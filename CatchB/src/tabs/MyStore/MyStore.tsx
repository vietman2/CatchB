import { useState } from "react";
import { View } from "react-native";
import MySegmentedButtons from "../../components/Buttons/SegmentedButtons";
import StoreDashboard from "../../containers/StoreDashboard/StoreDashboard";
import TaskBoard from "../../containers/TaskBoard/TaskBoard";
import ManageReservations from "../../containers/ManageReservations/ManageReservations";
import Sales from "../../containers/Sales/Sales";
import ManageCustomers from "../../containers/Customers/ManageCustomers";

export default function MyStore() {
  const [mode, setMode] = useState("Dashboard");

  const render = () => {
    if (mode === "Dashboard") {
      return <StoreDashboard />;
    }
    else if (mode === "Tasks") {
      return <TaskBoard />;
    }
    else if (mode === "Reservations") {
      return <ManageReservations />;
    }
    else if (mode === "Sales") {
      return <Sales />;
    }
    else if (mode === "Customers") {
      return <ManageCustomers />;
    }
    else {
      return null;
    }
  }

  return (
    <View>
      <MySegmentedButtons tab={mode} onPress={(value) => setMode(value)} />
      {render()}
    </View>
  );
}
