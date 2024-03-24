import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TaskBoard from "../TaskBoard/TaskBoard";
import ManageReservations from "../ManageReservations/ManageReservations";
import { NotReady } from ".components/Loading";
import { themeColors } from ".themes/colors";

const Tab = createMaterialTopTabNavigator();

export default function MyStoreMain() {
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
      <Tab.Screen name="예약관리" component={ManageReservations} />
      <Tab.Screen name="업무관리" component={TaskBoard} />
      <Tab.Screen name="리뷰관리" component={NotReady} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
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
