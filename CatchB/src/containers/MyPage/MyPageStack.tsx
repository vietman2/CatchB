import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Text } from "react-native-paper";

import MyPage from "./MyPage";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import UserProfile from "./Profile/UserProfile";
import EditProfile from "./Profile/EditProfile";
import Coupons from "./Coupon/Coupons";
import BackButton from "../../components/Buttons/BackButton";
import { leftTitle, rightTitle } from "../../components/Logos/TopBar";
import { MyPageStackParamList } from "../../variables/navigation";
import Points from "./Point/Points";

const MyPageStack = createStackNavigator<MyPageStackParamList>();
type MyPageNavigationProp = StackNavigationProp<
  MyPageStackParamList,
  "MyPageScreen"
>;
interface MyPageProps {
  navigation: MyPageNavigationProp;
}

export default function MyPageContainer({ navigation }: MyPageProps) {
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
      <MyPageStack.Screen
        name="Profile"
        component={UserProfile}
        options={{
          headerLeft: () => {
            return (
              <BackButton onPress={() => navigation.navigate("MyPageScreen")} />
            );
          },
          headerTitle: () => {
            return (
              <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                프로필
              </Text>
            );
          },
          headerRight: () => {
            return null;
          },
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerLeft: () => {
            return (
              <BackButton onPress={() => navigation.navigate("Profile")} />
            );
          },
          headerTitle: () => {
            return (
              <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                프로필 수정
              </Text>
            );
          },
          headerRight: () => {
            return null;
          },
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="Coupons"
        component={Coupons}
        options={{
          headerLeft: () => {
            return (
              <BackButton onPress={() => navigation.navigate("MyPageScreen")} />
            );
          },
          headerTitle: () => {
            return (
              <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                쿠폰함
              </Text>
            );
          },
          headerRight: () => {
            return null;
          },
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="Points"
        component={Points}
        options={{
          headerLeft: () => {
            return (
              <BackButton onPress={() => navigation.navigate("MyPageScreen")} />
            );
          },
          headerTitle: () => {
            return (
              <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                포인트
              </Text>
            );
          },
          headerRight: () => {
            return null;
          },
          headerTitleAlign: "center",
        }}
      />
    </MyPageStack.Navigator>
  );
}
