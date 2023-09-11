import { createStackNavigator } from "@react-navigation/stack";

import { HomeStackParamList } from "./navigation";
import Home from "../pages/Home/Home";
import CoachDetail from "../pages/Home/CoachDetail/CoachDetail";

const HomeStack = createStackNavigator<HomeStackParamList>();

export default function HomeContainer() {
  return (
    <HomeStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="SplashScreen" component={Home} />
      <HomeStack.Screen name="CoachDetail" component={CoachDetail}  />
    </HomeStack.Navigator>
  );
}
