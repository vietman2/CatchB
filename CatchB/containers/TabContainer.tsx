
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../pages/Home/Home";
import NearbyScreen from "../pages/Nearby/Nearby";
import CommunityScreen from "../pages/Community/Community";
import CalendarScreen from "../pages/Calendar/Calendar";
import MyPageScreen from "../pages/MyPage/MyPage";

export type RootTabParamList = {
  Home: undefined;
  Nearby: undefined;
  Community: undefined;
  Calendar: undefined;
  MyPage: undefined;
  Login: undefined;
}

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
              iconName = "chatbubble-ellipses-outline";
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
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "홈" }}
        />
        <Tab.Screen
          name="Nearby"
          component={NearbyScreen}
          options={{ title: "내 주변" }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{ title: "커뮤니티" }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ title: "캘린더" }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{ title: "마이페이지" }}
        />
      </Tab.Navigator>
    );
}