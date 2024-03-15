import { Text } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import MyPageMain from "./Main/MyPageMain";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import UserProfile from "./Profile/UserProfile";
import EditProfile from "./Profile/EditProfile";
import Points from "./Point/Points";
import CouponList from "./Coupon/CouponList";
import CouponRegister from "./Coupon/CouponRegister";
import RegisterPro from "./RegisterPro/RegisterPro";
import PasswordChange from "./PasswordChange/PasswordChange";
import NotReady from "../Base/NotReady";
import { BackButton } from ".components/Buttons";
import { SmallLogo } from ".components/Logos";
import { MyPageParams, MyPageScreenProps } from ".constants/navigation";

const MyPageStack = createStackNavigator<MyPageParams>();

export default function MyPageContainer() {
  const navigation =
    useNavigation<MyPageScreenProps<"MyPageScreen">["navigation"]>();

  const backToMyPage = () => (
    <BackButton onPress={() => navigation.navigate("MyPageScreen")} />
  );
  const backToProfile = () => (
    <BackButton onPress={() => navigation.navigate("Profile")} />
  );
  const backToCouponList = () => (
    <BackButton onPress={() => navigation.navigate("CouponList")} />
  );

  const headerTitle = (title: string) => {
    return (
      <Text
        variant="headlineSmall"
        style={{ fontWeight: "bold", color: "green" }}
      >
        {title}
      </Text>
    );
  };

  return (
    <MyPageStack.Navigator
      initialRouteName="MyPageScreen"
      screenOptions={{
        headerTitle: SmallLogo,
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <MyPageStack.Screen name="MyPageScreen" component={MyPageMain} />
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
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("프로필"),
        }}
      />
      <MyPageStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerLeft: () => backToProfile(),
          headerTitle: () => headerTitle("프로필 수정"),
        }}
      />
      <MyPageStack.Screen
        name="CouponList"
        component={CouponList}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("쿠폰함"),
        }}
      />
      <MyPageStack.Screen
        name="CouponRegister"
        component={CouponRegister}
        options={{
          headerLeft: () => backToCouponList(),
          headerTitle: () => headerTitle("쿠폰 등록"),
        }}
      />
      <MyPageStack.Screen
        name="Points"
        component={Points}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("포인트"),
        }}
      />
      <MyPageStack.Screen
        name="RegisterPro"
        component={RegisterPro}
        options={{
          headerLeft: () => backToMyPage(),
        }}
      />
      <MyPageStack.Screen
        name="Payments"
        component={NotReady}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("결제수단 관리"),
        }}
      />
      <MyPageStack.Screen
        name="FAQ"
        component={NotReady}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("자주 묻는 질문"),
        }}
      />
      <MyPageStack.Screen
        name="Reviews"
        component={NotReady}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("내가 남긴 리뷰"),
        }}
      />
      <MyPageStack.Screen
        name="PasswordChange"
        component={PasswordChange}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("비밀번호 변경"),
        }}
      />
    </MyPageStack.Navigator>
  );
}
