import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Text } from "react-native-paper";

import MyPageMain from "./Main/MyPageMain";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import UserProfile from "./Profile/UserProfile";
import EditProfile from "./Profile/EditProfile";
import Points from "./Point/Points";
import CouponList from "./Coupon/CouponList";
import CouponRegister from "./Coupon/CouponRegister";
import CoachRegister from "./CoachRegister/CoachRegister";
import FacilityRegister from "./FacilityRegister/FacilityRegister";
import Payments from "./Payment/Payments";
import FAQ from "./FAQ/FAQ";
import Reviews from "./Review/Reviews";
import PasswordChange from "./PasswordChange/PasswordChange";
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
  const backToMyPage = () => {
    return <BackButton onPress={() => navigation.navigate("MyPageScreen")} />;
  };

  const headerTitle = (title: string) => {
    return (
      <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
        {title}
      </Text>
    );
  };

  return (
    <MyPageStack.Navigator
      initialRouteName="MyPageScreen"
      screenOptions={{
        headerTitle: leftTitle,
        headerShadowVisible: false,
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
          headerTitle: () => headerTitle("프로필 수정"),
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="CouponList"
        component={CouponList}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("쿠폰함"),
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
          headerTitle: () => headerTitle("쿠폰 등록"),
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="Points"
        component={Points}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("포인트"),
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="CoachRegister"
        component={CoachRegister}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("Catch B 레슨 코치 등록"),
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="FacilityRegister"
        component={FacilityRegister}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("Catch B 시설 등록"),
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="Payments"
        component={Payments}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("결제수단 관리"),
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="FAQ"
        component={FAQ}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("자주 묻는 질문"),
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="Reviews"
        component={Reviews}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("내가 남긴 리뷰"),
          headerTitleAlign: "center",
        }}
      />
      <MyPageStack.Screen
        name="PasswordChange"
        component={PasswordChange}
        options={{
          headerLeft: () => backToMyPage(),
          headerTitle: () => headerTitle("비밀번호 변경"),
          headerTitleAlign: "center",
        }}
      />
    </MyPageStack.Navigator>
  );
}
