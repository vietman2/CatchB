import { View } from "react-native";
import { Text } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { ProHome } from "./Home/ProHome";
import { Calendar } from "./Calendar/Calendar";
import { StoreDashboard } from "./StoreDashboard/StoreDashboard";
import { Sales } from "./Sales/Sales";
import { themeColors } from "../../variables/colors";

// TODO: Remove this later
function NotReady() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineSmall">준비중입니다.</Text>
    </View>
  );
}

export default function ProMode() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 16,
        },
        tabBarIndicatorStyle: {
          backgroundColor: themeColors.primary,
        },
        tabBarStyle: {
          backgroundColor: themeColors.primaryContainer,
        },
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
