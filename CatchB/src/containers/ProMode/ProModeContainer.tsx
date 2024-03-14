import { View } from "react-native";
import { Badge, Icon, Text } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { ProHome } from "./Home/ProHome";
import { Calendar } from "./Calendar/Calendar";
import { StoreDashboard } from "./StoreDashboard/StoreDashboard";
import { Sales } from "./Sales/Sales";
import { SmallLogo } from "../../components/Logos";
import { themeColors } from ".themes/colors";
import { HomeStackParamList } from "../../variables/navigation";

// TODO: Remove this later
function NotReady() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineSmall">준비중입니다.</Text>
    </View>
  );
}

const ProStack = createStackNavigator<HomeStackParamList>();

function AlertIcon() {
  return (
    <View style={{ marginRight: 20 }}>
      <Badge size={6} style={{ position: "absolute", top: 0, right: 0 }} />
      <Icon source="bell-outline" size={24} color="green" />
    </View>
  );
}

function ProMode() {
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

export default function ProModeContainer() {
  return (
    <ProStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerLeft: SmallLogo,
        headerTitle: () => {
          return null;
        },
        headerRight: AlertIcon,
        headerShadowVisible: false,
      }}
    >
      <ProStack.Screen name="SplashScreen" component={ProMode} />
    </ProStack.Navigator>
  );
}
