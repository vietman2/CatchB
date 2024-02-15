import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import NormalHome from "./NormalHome";
import ProHome from "./ProHome";
import StoreDashboard from "../StoreDashboard/StoreDashboard";
import Sales from "../Sales/Sales";
import Calendar from "../Calendar/Calendar";
import { RootState } from "../../../store/store";
import { themeColors } from "../../../variables/colors";

const Tab = createMaterialTopTabNavigator();

function NotReady() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineSmall">준비중입니다.</Text>
    </View>
  );
}

export default function HomeMain() {
  const mode = useSelector((state: RootState) => state.general.mode);

  if (mode === "basic") {
    return <NormalHome />;
  } else {
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
        <Tab.Screen name="홈" component={ProHome} />
        <Tab.Screen name="대시보드" component={StoreDashboard} />
        <Tab.Screen name="매출" component={Sales} />
        <Tab.Screen name="캘린더" component={Calendar} />
        <Tab.Screen name="랭킹" component={NotReady} />
      </Tab.Navigator>
    );
  }
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
