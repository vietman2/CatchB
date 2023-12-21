import { useState } from "react";
import { ScrollView, View } from "react-native";
import MySegmentedButtons from "../../components/Buttons/SegmentedButtons";
import StoreDashboard from "../../containers/StoreDashboard/StoreDashboard";
import TaskBoard from "../../containers/TaskBoard/TaskBoard";
import ManageReservations from "../../containers/ManageReservations/ManageReservations";

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
    else {
      return null;
    }
  }

  return (
    <View>
      <MySegmentedButtons tab={mode} onPress={(value) => setMode(value)} />
      <ScrollView>{render()}</ScrollView>
    </View>
  );
}
