
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../components/Home/Home";
import NearbyScreen from "../components/Nearby/Nearby";
import CommunityScreen from "../components/Community/Community";
import CalendarScreen from "../components/Calendar/Calendar";
import MyPageScreen from "../components/MyPage/MyPage";

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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Nearby" component={NearbyScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="MyPage" component={MyPageScreen} />
      </Tab.Navigator>
    );
}