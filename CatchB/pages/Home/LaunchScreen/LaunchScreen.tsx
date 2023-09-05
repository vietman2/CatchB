import { ScrollView } from "react-native";

import Dashboard from "./components/Dashboard";
import Facilities from "./components/Facilities";
import Coaches from "./components/Coaches";
import Items from "./components/Items";

export default function LaunchScreen() {
    return (
      <ScrollView>
        <Dashboard />
        <Facilities />
        <Coaches />
        <Items />
      </ScrollView>
    );
}