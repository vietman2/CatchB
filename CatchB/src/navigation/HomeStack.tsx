import { createStackNavigator } from "@react-navigation/stack";
import { Image, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { HomeStackParamList } from "../variables/navigation";
import Home from "../tabs/Home";
import CoachDetail from "../pages/CoachDetail";
import FacilityDetail from "../pages/FacilityDetail";

/**
 * HomeContainer
 * 홈 화면의 구성을 담당한다.
 */

const HomeStack = createStackNavigator<HomeStackParamList>();

const CatchBLogo = () => {
  return (
    <Image
      source={require("assets/images/logo_font_right_white.png")}
      style={{ width: 150, height: 50, margin: 10 }}
    />
  );
};

const TextRight = () => {
  return <Text>캐치비</Text>;
};

export default function HomeContainer() {
  return (
    <HomeStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerLeft: CatchBLogo,
        headerTitle: () => {
          return null;
        },
        headerRight: TextRight,
        headerShadowVisible: false,
      }}
    >
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="SignUp" component={SignUp} />
      <HomeStack.Screen name="SplashScreen" component={Home} />
      <HomeStack.Screen
        name="CoachDetail"
        component={CoachDetail}
        options={({ route }) => ({
          headerLeft: () => {
            return (
              <Ionicons name="chevron-back-outline" size={30} color="green" />
            );
          },
          headerTitle: route.params.coach.name + " 코치",
          headerRight: CatchBLogo,
          headerTitleAlign: "center",
        })}
      />
      <HomeStack.Screen
        name="FacilityDetail"
        component={FacilityDetail}
        options={({ route }) => ({
          headerLeft: () => {
            return (
              <Ionicons name="chevron-back-outline" size={30} color="green" />
            );
          },
          headerTitle: route.params.facility.name,
          headerRight: CatchBLogo,
          headerTitleAlign: "center",
        })}
      />
    </HomeStack.Navigator>
  );
}
