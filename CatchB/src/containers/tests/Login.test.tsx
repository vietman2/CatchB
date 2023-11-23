import { fireEvent, act, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { renderWithProviders } from "../../utils/test-utils";
import Login from "../Login";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => ({
  Checkbox: "Checkbox",
  Provider: "Provider",
}));

const Stack = createStackNavigator();

describe("[Login] screen rendering test", () => {
  it("should render correctly", () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  });

  it("should render error text correctly", async () => {
    const { getByText } = renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    fireEvent.press(getByText("Login"));
    await waitFor(() =>
      expect(
        getByText("아이디 또는 비밀번호가 일치하지 않습니다.")
      ).toBeTruthy()
    );
  });

  it("should handle toggle correctly", () => {
    const { getByTestId } = renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    fireEvent.press(getByTestId("checkbox"));
  });

  it("should handle login correctly", async () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="MyPageScreen"
            component={Login}
            options={{
              headerTitle: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const idInput = getByPlaceholderText("아이디");
    const passwordInput = getByPlaceholderText("비밀번호");

    fireEvent.changeText(idInput, "admin");
    fireEvent.changeText(passwordInput, "admin");

    await waitFor(() => {
      expect(idInput.props.value).toBe("admin");
      expect(passwordInput.props.value).toBe("admin");
    });

    await act(() => fireEvent.press(getByText("Login")));
  });

  it("should handle button press correctly", async () => {
    const { getByText, getByTestId } = renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: "",
            }}
          />
          <Stack.Screen name="SignUp" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    await act(() => {
      fireEvent.press(getByText("회원가입"));
      fireEvent.press(getByText("비밀번호 찾기"));
      fireEvent.press(getByTestId("kakaoButton"));
      fireEvent.press(getByTestId("naverButton"));
    });
  });
});
