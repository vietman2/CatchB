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
import Points from "./Point/Points";
import CouponList from "./Coupon/CouponList";
import CouponRegister from "./Coupon/CouponRegister";
import CoachRegister from "./CoachRegister/CoachRegister";
import FacilityRegister from "./FacilityRegister/FacilityRegister";
import BackButton from "../../components/Buttons/BackButton";
import { leftTitle } from "../../components/Logos/TopBar";
import { MyPageStackParamList } from "../../variables/navigation";

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
        headerTitle: leftTitle,
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
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="CouponList"
        component={CouponList}
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
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="CouponRegister"
        component={CouponRegister}
        options={{
          headerLeft: () => {
            return (
              <BackButton onPress={() => navigation.navigate("CouponList")} />
            );
          },
          headerTitle: () => {
            return (
              <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                쿠폰 등록
              </Text>
            );
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
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="CoachRegister"
        component={CoachRegister}
        options={{
          headerLeft: () => {
            return (
              <BackButton onPress={() => navigation.navigate("MyPageScreen")} />
            );
          },
          headerTitle: () => {
            return (
              <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                Catch B 레슨 코치 등록
              </Text>
            );
          },
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="FacilityRegister"
        component={FacilityRegister}
        options={{
          headerLeft: () => {
            return (
              <BackButton onPress={() => navigation.navigate("MyPageScreen")} />
            );
          },
          headerTitle: () => {
            return (
              <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                Catch B 시설 등록
              </Text>
            );
          },
          headerTitleAlign: "center",
        }}
      />
    </MyPageStack.Navigator>
  );
}
