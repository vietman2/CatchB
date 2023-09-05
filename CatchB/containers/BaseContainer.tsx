import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image, View } from "react-native";

import Login from "../pages/Account/Login";
import SignUp from "../pages/Account/SignUp";
import TabContainer from "./TabContainer";
import { IconText } from "../pages/Account/components/Icons";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Main: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function BaseContainer() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <RootStack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerLeft: () => {
          return (
            <Image
              source={require("../assets/images/logo_font_right_white.png")}
              style={{ width: 150, height: 50 }}
            />
          );
        },
        headerTitle: () => {
          return null;
        },
        headerRight: () => {
          return (
            <View style={{ flexDirection: "row" }}>
              <IconText
                name="log-in-outline"
                onPress={handleLogin}
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
      <RootStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Main" component={TabContainer} />
    </RootStack.Navigator>
  );
}
