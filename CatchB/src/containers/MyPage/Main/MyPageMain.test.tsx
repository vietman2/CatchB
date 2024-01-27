import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MyPageMain from "./MyPageMain";
import { admin } from "../../../variables/mvp_dummy_data/user";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Text: "Text",
    TouchableRipple: "TouchableRipple",
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress} accessibilityLabel="버튼">
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
  };
});
jest.mock("../../../components/Avatar/AvatarHorizontal", () => {
  const { View } = jest.requireActual("react-native");
  return () => <View testID="badge">ProfileBadge</View>;
});
jest.mock("../../../components/Dialogs/LoginDialog", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return ({ title, onClose }: any) => (
    <TouchableOpacity onPress={onClose}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});
jest.mock("../../../components/Buttons/IconButton", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");
  return ({ icon, title, onPress }: any) => (
    <TouchableOpacity onPress={onPress}>
      <Text testID="icon">{icon}</Text>
      <Text testID="title">{title}</Text>
    </TouchableOpacity>
  );
});
jest.mock("../../../components/Buttons/TabButton", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");
  return ({ title, detail }: any) => (
    <TouchableOpacity>
      <Text testID="title">{title}</Text>
      <Text testID="detail">{detail}</Text>
    </TouchableOpacity>
  );
});
jest.mock(
  "../../../components/Divider/VerticalDivider",
  () => "VerticalDivider"
);

const Stack = createStackNavigator();

const components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MyPage" component={MyPageMain} />
        <Stack.Screen name="Login" component={MyPageMain} />
        <Stack.Screen name="Profile" component={MyPageMain} />
        <Stack.Screen name="EditProfile" component={MyPageMain} />
        <Stack.Screen name="CouponList" component={MyPageMain} />
        <Stack.Screen name="Points" component={MyPageMain} />
        <Stack.Screen name="CoachRegister" component={MyPageMain} />
        <Stack.Screen name="FacilityRegister" component={MyPageMain} />
        <Stack.Screen name="Payments" component={MyPageMain} />
        <Stack.Screen name="Reviews" component={MyPageMain} />
        <Stack.Screen name="FAQ" component={MyPageMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<MyPage />", () => {
  it("handles presses", () => {
    const { getByText } = renderWithProviders(components());
    waitFor(() => {
      fireEvent.press(getByText("쿠폰함"));
      fireEvent.press(getByText("포인트"));
      fireEvent.press(getByText("결제수단 관리"));
      fireEvent.press(getByText("리뷰"));
    });
  });

  it("navigates to Login screen when user is not logged in", () => {
    const { getByTestId, getByText } = renderWithProviders(components());

    waitFor(() => {
      fireEvent.press(getByTestId("badge"));
      fireEvent.press(getByText("로그인"));
    });
  });

  it("navigates to all screens when user is logged in", () => {
    const { getByTestId, getByText } = renderWithProviders(components(), {
      preloadedState: { auth: { user: admin, token: "" } },
    });

    waitFor(() => {
      fireEvent.press(getByTestId("badge"));
      fireEvent.press(getByText("쿠폰함"));
      fireEvent.press(getByText("코치 등록하기"));
      fireEvent.press(getByText("시설 등록하기"));
      fireEvent.press(getByText("결제수단 관리"));
      fireEvent.press(getByText("리뷰"));
      fireEvent.press(getByText("자주 묻는 질문"));
    });
  });

  it("handles menu press", () => {
    const { getByText } = renderWithProviders(components());
    fireEvent.press(getByText("친구 초대하기"));
    fireEvent.press(getByText("레슨 코치 초대하기"));
    fireEvent.press(getByText("매장 정보 제보하기"));
    fireEvent.press(getByText("1:1 문의"));
    fireEvent.press(getByText("..?"));
    fireEvent.press(getByText("알림 맞춤 설정"));
    fireEvent.press(getByText("즐겨찾기?"));
    fireEvent.press(getByText("최근 본?"));
  });
});
