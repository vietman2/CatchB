import { createStackNavigator } from "@react-navigation/stack";

import MyPage from "../tabs/MyPage";
import Login from "../containers/Login";
import SignUp from "../containers/SignUp";
import { MyPageStackParamList } from "../variables/navigation";

const MyPageStack = createStackNavigator<MyPageStackParamList>();

export default function MyPageContainer() {
  return (
    <MyPageStack.Navigator
      initialRouteName="MyPageScreen"
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <MyPageStack.Screen name="MyPageScreen" component={MyPage} />
      <MyPageStack.Screen name="Login" component={Login} />
      <MyPageStack.Screen name="SignUp" component={SignUp} />
    </MyPageStack.Navigator>
  );
}
