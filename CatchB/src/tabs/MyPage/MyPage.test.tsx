import { act, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { renderWithProviders } from "../../utils/test-utils";
import MyPage from "./MyPage";
import { admin } from "../../variables/mvp_dummy_data/user";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Text: "Text",
    TouchableRipple: "TouchableRipple",
  };
});
jest.mock("../../components/ProfileBadge", () => {
  const { View } = jest.requireActual("react-native");
  return () => (<View testID="badge">ProfileBadge</View>);
});
jest.mock("../../components/Buttons", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");
  return {
    TextButton: ({ text, onPress }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{text}</Text>
      </TouchableOpacity>
    ),
  };
});
jest.mock("../../components/FAB", () => ({
  FABGroup: () => "FABGroup",
}));


const Stack = createStackNavigator();

const components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="Login"
          component={MyPage}
          options={{
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>);
};

describe("MyPage", () => {
  it("renders correctly", async () => {
    renderWithProviders(components());
  });

  it("navigates to Login screen when user is not logged in", async () => {
    const { getByTestId } = renderWithProviders(components());
    await act(() => {
      fireEvent.press(getByTestId("badge"));
    });
  });

  it("navigates to Profile screen when user is logged in", async () => {
    const { getByTestId } = renderWithProviders(components(), {
      preloadedState: { auth: { user: admin, token: "" } },
    });
    await act(() => {
      fireEvent.press(getByTestId("badge"));
    });
  });

  it("handles menu press", () => {
    const { getByText } = renderWithProviders(components());
    fireEvent.press(getByText("친구 초대하기"));
    fireEvent.press(getByText("레슨 코치 초대하기"));
    fireEvent.press(getByText("매장 정보 제보하기"));
    fireEvent.press(getByText("결제수단"));
    fireEvent.press(getByText("1:1 문의"));
    fireEvent.press(getByText("공지사항"));
    fireEvent.press(getByText("자주 묻는 질문"));
    fireEvent.press(getByText("알림 맞춤 설정"));
    fireEvent.press(getByText("개인정보 처리방침"));
    fireEvent.press(getByText("이용약관"));
    fireEvent.press(getByText("현재 버전 0.1.0"));
  });
});
