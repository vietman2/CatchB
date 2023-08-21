import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./components/Home/Home";
import NearbyScreen from "./components/Nearby/Nearby";
import CommunityScreen from "./components/Community/Community";
import CalendarScreen from "./components/Calendar/Calendar";
import MyPageScreen from "./components/MyPage/MyPage";

export type RootTabParamList = {
  Home: undefined;
  Nearby: undefined;
  Community: undefined;
  Calendar: undefined;
  MyPage: undefined;
  Login: undefined;
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  /*
  if (로그인 === false) {
    return (
      <로그인화면 />
    )
  }
  else {
    */
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Nearby" component={NearbyScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
    </NavigationContainer>
    
  );
  
  //}
}
