import { fireEvent, act, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { renderWithProviders } from "../../utils/test-utils";
import Login from "../auth/Login";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.requireActual("react-native-paper");

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
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
        <Stack.Screen name="MyPageScreen" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<Login />", () => {
  it("should render correctly", () => {
    render();
  });

  it("should handle login error", async () => {
    const { getByTestId, getByText } = render();

    const usernameInput = getByTestId("username-input");
    const passwordInput = getByTestId("password-input");
    const loginButton = getByTestId("login-button");

    await act(async () => {
      fireEvent.changeText(usernameInput, "test");
      fireEvent.changeText(passwordInput, "test");
      fireEvent.press(loginButton);
    });

    await waitFor(() => {
      expect(
        getByText("아이디 또는 비밀번호가 일치하지 않습니다.")
      ).toBeTruthy();
    });
  });

  it("should handle login success", async () => {
    const { getByTestId } = render();

    const usernameInput = getByTestId("username-input");
    const passwordInput = getByTestId("password-input");
    const loginButton = getByTestId("login-button");

    fireEvent.changeText(usernameInput, "exampleuser");
    fireEvent.changeText(passwordInput, "examplepassword");

    await act(async () => {
      fireEvent.press(loginButton);
    });
  });

  it("should handle kakao and naver login", async () => {
    const { getByTestId } = render();

    const kakaoButton = getByTestId("kakao-button");
    const naverButton = getByTestId("naver-button");

    await act(async () => {
      fireEvent.press(kakaoButton);
      fireEvent.press(naverButton);
    });
  });

  it("should handle text buttons", async () => {
    const { getByText } = render();

    const findIdButton = getByText("아이디 찾기");
    const findPasswordButton = getByText("비밀번호 찾기");

    await act(async () => {
      fireEvent.press(findIdButton);
      fireEvent.press(findPasswordButton);
    });
  });

  it("should handle sign up button", async () => {
    const { getByText } = render();

    const signUpButton = getByText("회원가입");

    await act(async () => {
      fireEvent.press(signUpButton);
    });
  });

  it("should handle eye icon", async () => {
    const { getByTestId } = render();

    const eyeIcon = getByTestId("password-eye-icon");

    await act(async () => {
      fireEvent.press(eyeIcon);
      fireEvent.press(eyeIcon);
    });
  });
});
