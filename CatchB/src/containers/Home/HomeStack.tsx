import { createStackNavigator } from "@react-navigation/stack";

import HomeMain from "./Main/HomeMain";
import { leftTitle } from "../../components/Logos/TopBar";
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
        headerRight: null,
        headerShadowVisible: false,
      }}
    >
      <HomeStack.Screen name="SplashScreen" component={HomeMain} />
    </HomeStack.Navigator>
  );
}
