import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { NotReady } from "./";
import { themeColors } from "../../../variables/colors";

const Tab = createMaterialTopTabNavigator();

export default function HistoryMain() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.labelStyle,
        tabBarIndicatorStyle: styles.indicatorStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="대관" component={NotReady} />
      <Tab.Screen name="레슨" component={NotReady} />
      <Tab.Screen name="벼룩시장" component={NotReady} />
      <Tab.Screen name="기타" component={NotReady} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorStyle: {
    backgroundColor: themeColors.primary,
  },
  tabBarStyle: {
    backgroundColor: themeColors.primaryContainer,
  },
  labelStyle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
