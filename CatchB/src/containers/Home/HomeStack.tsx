import { Dimensions, View } from "react-native";
import { Badge, Icon } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

import HomeMain from "./Main/HomeMain";
import { leftTitle } from "../../components/Logos/TopBar";
import { HomeStackParamList } from "../../variables/navigation";

const HomeStack = createStackNavigator<HomeStackParamList>();

function AlertIcon() {
  return (
    <View style={{ marginRight: 20 }}>
      <Badge size={6} style={{ position: "absolute", top: 0, right: 0 }} />
      <Icon source="bell-outline" size={24} color="green" />
    </View>
  );
}

export default function HomeContainer() {
  return (
    <HomeStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerLeft: leftTitle,
        headerTitle: () => {
          return null;
        },
        headerRight: AlertIcon,
        headerShadowVisible: false,
      }}
    >
      <HomeStack.Screen name="SplashScreen" component={HomeMain} />
    </HomeStack.Navigator>
  );
}
