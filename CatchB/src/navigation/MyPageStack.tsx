import { createStackNavigator } from "@react-navigation/stack";

import MyPage from "../tabs/MyPage";
import Login from "../containers/Login";
import SignUp from "../containers/SignUp";
import { leftTitle, rightTitle } from "../components/TopBar";
import { MyPageStackParamList } from "../variables/navigation";

const MyPageStack = createStackNavigator<MyPageStackParamList>();

export default function MyPageContainer() {
  return (
    <MyPageStack.Navigator
      initialRouteName="MyPageScreen"
      screenOptions={{
        headerLeft: leftTitle,
        headerTitle: () => {
          return null;
        },
        headerRight: rightTitle,
        headerShadowVisible: false,
      }}
    >
      <MyPageStack.Screen name="MyPageScreen" component={MyPage} />
      <MyPageStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <MyPageStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </MyPageStack.Navigator>
  );
}
