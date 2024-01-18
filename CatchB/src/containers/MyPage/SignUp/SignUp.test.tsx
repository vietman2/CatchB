import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "./SignUp";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen name="MyPageScreen" component={SignUp} />
        <Stack.Screen name="Login" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<SignUp />", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it("should handle successful register", async () => {
    jest.spyOn(axios, "post").mockImplementationOnce(() =>
      Promise.resolve({
        status: 201,
        data: {},
      })
    );
    jest.spyOn(axios, "post").mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: { token: "token", user: "user" },
      })
    );

    const { getByTestId } = render();

    const usernameInput = getByTestId("username-input");
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const passwordCheckInput = getByTestId("password-check-input");
    const firstNameInput = getByTestId("first-name-input");
    const lastNameInput = getByTestId("last-name-input");
    const phoneNumberInput = getByTestId("phone-number-input");

    await waitFor(() => {
      fireEvent.changeText(usernameInput, "test");
      fireEvent.changeText(emailInput, "test");
      fireEvent.changeText(passwordInput, "test");
      fireEvent.changeText(passwordCheckInput, "test");
      fireEvent.changeText(firstNameInput, "test");
      fireEvent.changeText(lastNameInput, "test");
      fireEvent.changeText(phoneNumberInput, "test");
      fireEvent.press(getByTestId("male-button"));
    });

    waitFor(() => fireEvent.press(getByTestId("sign-up-button")));
  });

  it("should handle register error: auto login fail", async () => {
    jest.spyOn(axios, "post").mockImplementationOnce(() =>
      Promise.resolve({
        status: 201,
        data: {},
      })
    );
    jest.spyOn(axios, "post").mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        data: {},
      })
    );

    const { getByTestId } = render();

    await waitFor(() => {
      fireEvent.press(getByTestId("male-button"));
    });

    waitFor(() => fireEvent.press(getByTestId("sign-up-button")));
  });

  it("should handle register errors", async () => {
    jest.spyOn(axios, "post").mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        data: { errors: { username: ["에러"] } },
      })
    );

    const { getByTestId } = render();

    await waitFor(() => {
      fireEvent.press(getByTestId("male-button"));
      fireEvent.press(getByTestId("sign-up-button"));
    });

    jest.spyOn(axios, "post").mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        data: { errors: { email: ["에러"] } },
      })
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("female-button"));
      fireEvent.press(getByTestId("sign-up-button"));
    });

    jest.spyOn(axios, "post").mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        data: { errors: { first_name: ["에러"] } },
      })
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("sign-up-button"));
    });

    jest.spyOn(axios, "post").mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        data: { errors: { last_name: ["에러"] } },
      })
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("sign-up-button"));
    });

    jest.spyOn(axios, "post").mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        data: { errors: { phone_number: ["에러"] } },
      })
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("sign-up-button"));
    });

    jest.spyOn(axios, "post").mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        data: { errors: { password: ["에러"] } },
      })
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("sign-up-button"));
    });
  });

  it("should handle password eye icon press and signup without picking gender", async () => {
    const { getByTestId } = render();

    const passwordEyeIcon = getByTestId("password-eye-icon");
    const passwordCheckEyeIcon = getByTestId("password-check-eye-icon");

    await waitFor(() => {
      fireEvent.press(passwordEyeIcon);
      fireEvent.press(passwordCheckEyeIcon);
      fireEvent.press(getByTestId("sign-up-button"));
    });
  });
});
