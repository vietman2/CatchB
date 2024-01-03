import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MyPage from "./MyPage";
import { renderWithProviders } from "../../utils/test-utils";
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
jest.mock("../../components/Avatar/AvatarHorizontal", () => {
  const { View } = jest.requireActual("react-native");
  return () => <View testID="badge">ProfileBadge</View>;
});
jest.mock("../../components/Buttons/TextButton", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");
  return ({ text, onPress }: any) => (
    <TouchableOpacity onPress={onPress}>
      <Text testID="text">{text}</Text>
    </TouchableOpacity>
  );
});
jest.mock("../../components/Buttons/FAB", () => "FABGroup");
jest.mock("../../components/Buttons/IconButton", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");
  return ({ icon, title, onPress }: any) => (
    <TouchableOpacity onPress={onPress}>
      <Text testID="icon">{icon}</Text>
      <Text testID="title">{title}</Text>
    </TouchableOpacity>
  );
});
jest.mock("../../components/Buttons/TabButton", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");
  return ({ title, detail }: any) => (
    <TouchableOpacity>
      <Text testID="title">{title}</Text>
      <Text testID="detail">{detail}</Text>
    </TouchableOpacity>
  );
});
jest.mock("../../components/Divider/VerticalDivider", () => "VerticalDivider");

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
        <Stack.Screen
          name="Profile"
          component={MyPage}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={MyPage}
          options={{
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<MyPage />", () => {
  it("renders correctly", async () => {
    renderWithProviders(components());
  });

  it("navigates to Login screen when user is not logged in", () => {
    const { getByTestId } = renderWithProviders(components());
    waitFor(() => {
      fireEvent.press(getByTestId("badge"));
    });
  });

  it("navigates to Profile screen when user is logged in", () => {
    const { getByTestId } = renderWithProviders(components(), {
      preloadedState: { auth: { user: admin, token: "" } },
    });
    waitFor(() => {
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
  });
});
