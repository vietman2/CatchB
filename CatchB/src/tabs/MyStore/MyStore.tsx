import { useState } from "react";
import { ScrollView } from "react-native";
import MySegmentedButtons from "../../components/Buttons/SegmentedButtons";
import StoreDashboard from "../../containers/mystore/StoreDashboard";
import TaskBoard from "../../containers/mystore/TaskBoard";

export default function MyStore() {
  const [mode, setMode] = useState("Dashboard");

  const render = () => {
    if (mode === "Dashboard") {
      return <StoreDashboard />;
    }
    else if (mode === "Tasks") {
      return <TaskBoard />;
    }
    else {
      return null;
    }
  }

  return (
    <ScrollView>
      <MySegmentedButtons tab={mode} onPress={(value) => setMode(value)}/>
      {render()}
    </ScrollView>
  );
}
