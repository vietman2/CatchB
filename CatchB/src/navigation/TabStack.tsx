import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeStack from "./HomeStack";
import NearbyScreen from "../tabs/Nearby";
import CommunityScreen from "../tabs/Community";
import CalendarScreen from "../tabs/Calendar";
import MyPageStack from "./MyPageStack";
import { RootTabParamList } from "../variables/navigation";

/**
 * TabContainer
 * 하단 탭의 구성을 담당한다.
 */

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabContainer() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Nearby") {
            iconName = "location-outline";
          } else if (route.name === "Community") {
            iconName = "people-outline";
          } else if (route.name === "Calendar") {
            iconName = "calendar-outline";
          } else if (route.name === "MyPage") {
            iconName = "person-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#15249F",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: "홈" }} />
      <Tab.Screen
        name="Nearby"
        component={NearbyScreen}
        options={{ title: "내 주변" }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{ title: "함께하기" }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: "캘린더" }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStack}
        options={{ title: "마이페이지" }}
      />
    </Tab.Navigator>
  );
}
