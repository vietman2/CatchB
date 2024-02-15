import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TaskBoard from "../../MyStore/TaskBoard/TaskBoard";
import ManageReservations from "../../MyStore/ManageReservations/ManageReservations";
import ManageCustomers from "../../MyStore/Customers/ManageCustomers";
import { themeColors } from "../../../variables/colors";

const Tab = createMaterialTopTabNavigator();

function NotReady() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineSmall">준비중입니다.</Text>
    </View>
  );
}

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
