/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { fireEvent, act, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./Login";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const ActualTextInput = jest.requireActual("react-native-paper").TextInput;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  const TextInput = (props: any) => {
    return <ActualTextInput {...props}>{props.right}</ActualTextInput>;
  };
  const TextInputIcon = ({ icon, onPress }: any) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{icon}</Text>
    </TouchableOpacity>
  );
  TextInput.Icon = TextInputIcon;

  return {
    PaperProvider: Provider,
    Button: ({ onPress, children, testID }: any) => (
      <TouchableOpacity onPress={onPress} testID={testID}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Divider: "Divider",
    Text: "Text",
    TextInput: TextInput,
  };
});
jest.mock("../../../components/Logos", () => ({
  LoginLogo: "Logo",
}));
jest.mock("../../../components/Buttons", () => ({
  NaverButton: "NaverButton",
  KakaoButton: "KakaoButton",
}));

const Stack = createStackNavigator();

const FakeMyPageScreen = () => {
  return <>qwer</>;
};

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
        <Stack.Screen name="MyPageScreen" component={FakeMyPageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<Login />", () => {
  it("should handle login error: wrong credentials", () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 400,
        data: {
          non_field_errors: ["주어진 자격 증명으로 로그인이 불가능합니다."],
        },
      })
    );

    const { getByTestId } = render();

    const loginButton = getByTestId("login-button");

    waitFor(() => {
      fireEvent.press(loginButton);
    });
  });

  it("should handle login error: server error", () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: {},
      })
    );

    const { getByTestId } = render();

    const loginButton = getByTestId("login-button");

    waitFor(() => {
      fireEvent.press(loginButton);
    });
  });

  it("should handle login error: blank password", () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 400,
        data: { password: ["This field may not be blank."] },
      })
    );

    const { getByTestId } = render();

    const loginButton = getByTestId("login-button");

    waitFor(() => {
      fireEvent.press(loginButton);
    });
  });

  it("should handle login error: blank username", () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 400,
        data: { non_field_errors: ["username field may not be blank."] },
      })
    );

    const { getByTestId } = render();

    const loginButton = getByTestId("login-button");

    waitFor(() => {
      fireEvent.press(loginButton);
    });
  });

  it("should handle login success", () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: { token: "token", user: "user" },
      })
    );
    const { getByTestId } = render();

    const usernameInput = getByTestId("username-input");
    const passwordInput = getByTestId("password-input");
    const loginButton = getByTestId("login-button");

    waitFor(() => {
      fireEvent.changeText(usernameInput, "username");
      fireEvent.changeText(passwordInput, "password");
      fireEvent.press(loginButton);
    });
  });

  it("should handle kakao and naver login", async () => {
    const { getByTestId, getByText } = render();

    const kakaoButton = getByTestId("kakao-button");
    const naverButton = getByTestId("naver-button");

    waitFor(() => {
      fireEvent.press(kakaoButton);
    });
    await getByText("카카오 로그인 기능은 아직 구현되지 않았습니다.");

    waitFor(() => {
      fireEvent.press(naverButton);
    });
    await getByText("네이버 로그인 기능은 아직 구현되지 않았습니다.");
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
    const { getByText } = render();

    await act(async () => {
      fireEvent.press(getByText("eye-outline"));
    });

    await act(async () => {
      fireEvent.press(getByText("eye-off-outline"));
    });
  });
});
