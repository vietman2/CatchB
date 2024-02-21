/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { Alert, Share } from "react-native";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MyPageMain from "./MyPageMain";
import { renderWithProviders } from "../../../utils/test-utils";
import { admin } from "../../../variables/mvp_dummy_data/user";

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
    Chip: "Chip",
  };
});
jest.mock("react-native-progress/Bar", () => "ProgressBar");
jest.mock("rn-tourguide", () => ({
  TourGuideZone: "TourGuideZone",
  useTourGuideController: () => ({ start: jest.fn() }),
}));
jest.mock("../../../components/Buttons/TabButton", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");
  return ({ title, detail }: any) => (
    <TouchableOpacity>
      <Text testID="title">{title}</Text>
      <Text testID="detail">{detail}</Text>
    </TouchableOpacity>
  );
});

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
  it("navigates to Login screen when user is not logged in", () => {
    const { getByTestId, getByText } = renderWithProviders(components());

    waitFor(() => {
      fireEvent.press(getByText("찜"));
      fireEvent.press(getByText("결제수단"));
      fireEvent.press(getByText("리뷰"));
      fireEvent.press(getByTestId("badge"));
      fireEvent.press(getByText("쿠폰함"));
      fireEvent.press(getByText("포인트"));
      fireEvent.press(getByText("코치 등록하기"));
      fireEvent.press(getByText("시설 등록하기"));
    });
  });

  it("handles login alert", async () => {
    jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
    const { getByText } = renderWithProviders(components());

    await waitFor(() => {
      fireEvent.press(getByText("쿠폰함"));
    });

    const alert = Alert.alert.mock.calls[0][2];

    waitFor(() => {
      alert[1].onPress();
    });
  });

  it("handles menu press", () => {
    const { getByText } = renderWithProviders(components());

    waitFor(() => {
      fireEvent.press(getByText("친구 초대하기"));
      fireEvent.press(getByText("레슨 코치 초대하기"));
      fireEvent.press(getByText("매장 정보 제보하기"));
      fireEvent.press(getByText("진행중인 이벤트"));
      fireEvent.press(getByText("공지사항"));
      fireEvent.press(getByText("1:1 문의"));
      fireEvent.press(getByText("자주 묻는 질문"));
      fireEvent.press(getByText("알림 맞춤 설정"));
      fireEvent.press(getByText("약관 및 정책"));
      fireEvent.press(getByText("제휴 문의하기"));
      fireEvent.press(getByText("현재 버전: Beta 0.0.0"));
    });
  });

  it("handles share", () => {
    const { getByText } = renderWithProviders(components(), {
      preloadedState: {
        auth: {
          token: "token",
          user: admin,
        },
      },
    });

    jest.spyOn(Share, "share").mockImplementation(jest.fn());

    waitFor(() => {
      fireEvent.press(getByText("친구 초대하기"));
    });
  });
});
