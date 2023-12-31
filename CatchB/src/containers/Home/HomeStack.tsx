import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Home";
import { leftTitle, rightTitle } from "../../components/Logos/TopBar";
import { HomeStackParamList } from "../../variables/navigation";

const HomeStack = createStackNavigator<HomeStackParamList>();

export default function HomeContainer() {
  return (
    <HomeStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerLeft: leftTitle,
        headerTitle: () => {
          return null;
        },
        headerRight: rightTitle,
        headerShadowVisible: false,
      }}
    >
      <HomeStack.Screen name="SplashScreen" component={Home} />
    </HomeStack.Navigator>
  );
}
