import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";

import Login from "../pages/Account/Login";
import SignUp from "../pages/Account/SignUp";
import { HomeStackParamList } from "./navigation";
import { IconText } from "../pages/Account/components/Icons";
import Home from "../pages/Home/Home";
import CoachDetail from "../pages/Home/CoachDetail/CoachDetail";

const HomeStack = createStackNavigator<HomeStackParamList>();

export default function HomeContainer() {

  return (
    <HomeStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerLeft: () => {
          return (
            <Image
              source={require("../assets/images/logo_font_right_white.png")}
              style={{ width: 150, height: 50, margin: 10 }}
            />
          );
        },
        headerTitle: () => {
          return null;
        },
        headerRight: () => {
          return (
            <View style={{ flexDirection: "row", marginRight: 20, marginTop: 10 }}>
              <IconText
                name="log-in-outline"
                onPress={() => {}}
                text="로그인"
              />
              <IconText name="wallet-outline" onPress={() => {}} text="결제" />
              <IconText name="alarm-outline" onPress={() => {}} text="예약" />
            </View>
          );
        },
        headerShadowVisible: false,
      }}
    >
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="SignUp" component={SignUp} />
      <HomeStack.Screen name="SplashScreen" component={Home} />
      <HomeStack.Screen name="CoachDetail" component={CoachDetail} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}
