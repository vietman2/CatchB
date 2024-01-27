import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PasswordChange from "./PasswordChange";
import * as SecureStore from "../../../store/secure";
import * as account from "../../../services/account";
import { admin } from "../../../variables/mvp_dummy_data/user";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => ({
  ...jest.requireActual("react-native-paper"),
  ActivityIndicator: "ActivityIndicator",
}));

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PasswordChange"
          component={PasswordChange}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen name="MyPageScreen" component={PasswordChange} />
      </Stack.Navigator>
    </NavigationContainer>,
    {
      preloadedState: {
        auth: {
          user: admin,
          token: "token",
        },
      },
    }
  );
};

describe("<PasswordChange />", () => {
  it("should render when user is null", () => {
    renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="PasswordChange"
            component={PasswordChange}
            options={{
              headerTitle: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  });

  it("should handle empty fields correctly and change successfully", async () => {
    jest.spyOn(account, "changePassword").mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );
    jest
      .spyOn(SecureStore, "get")
      .mockImplementationOnce(() => Promise.resolve("refresh"));
    jest.spyOn(account, "logout").mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );

    const { getByTestId, getByText } = render();

    const oldPasswordInput = getByTestId("password-input");
    const newPasswordInput = getByTestId("new-password-input");
    const newPasswordCheckInput = getByTestId("new-password-check-input");
    const button = getByText("확인");

    fireEvent.press(button);

    await waitFor(() => fireEvent.changeText(oldPasswordInput, "oldPassword"));
    fireEvent.press(button);

    await waitFor(() => fireEvent.changeText(newPasswordInput, "newPassword"));
    fireEvent.press(button);

    await waitFor(() => {
      fireEvent.changeText(newPasswordCheckInput, "newPassword");
    });

    waitFor(() => fireEvent.press(button));
  });

  it("should handle logout failure: fail to logout", async () => {
    jest.spyOn(account, "changePassword").mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );
    jest.spyOn(account, "logout").mockImplementationOnce(() =>
      Promise.resolve({
        status: 500,
        data: {},
      })
    );
    jest
      .spyOn(SecureStore, "get")
      .mockImplementationOnce(() => Promise.resolve("refresh"));

    const { getByTestId, getByText } = render();

    const oldPasswordInput = getByTestId("password-input");
    const newPasswordInput = getByTestId("new-password-input");
    const newPasswordCheckInput = getByTestId("new-password-check-input");
    const button = getByText("확인");

    await waitFor(() => fireEvent.changeText(oldPasswordInput, "oldPassword"));
    await waitFor(() => fireEvent.changeText(newPasswordInput, "newPassword"));
    await waitFor(() => {
      fireEvent.changeText(newPasswordCheckInput, "newPasswordCheck");
    });

    await waitFor(() => fireEvent.press(button));
  });

  it("should handle logout failure: fail to reset ", async () => {
    jest.spyOn(account, "changePassword").mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );
    jest
      .spyOn(SecureStore, "get")
      .mockImplementationOnce(() => Promise.resolve(null));

    const { getByTestId, getByText } = render();

    const oldPasswordInput = getByTestId("password-input");
    const newPasswordInput = getByTestId("new-password-input");
    const newPasswordCheckInput = getByTestId("new-password-check-input");
    const button = getByText("확인");

    await waitFor(() => fireEvent.changeText(oldPasswordInput, "oldPassword"));
    await waitFor(() => fireEvent.changeText(newPasswordInput, "newPassword"));
    await waitFor(() => {
      fireEvent.changeText(newPasswordCheckInput, "newPasswordCheck");
    });

    await waitFor(() => fireEvent.press(button));
  });

  it("should handle password change failures", async () => {
    const mockChangePassword = (errors: any) => {
      jest.spyOn(account, "changePassword").mockImplementationOnce(() =>
        Promise.resolve({
          status: 400,
          data: { errors },
        })
      );
    }

    const { getByTestId, getByText } = render();
    await waitFor(() => {
      fireEvent.changeText(getByTestId("password-input"), "oldPassword");
      fireEvent.changeText(getByTestId("new-password-input"), "newPassword");
      fireEvent.changeText(
        getByTestId("new-password-check-input"),
        "newPasswordCheck"
      );
    });

    mockChangePassword({ old_password: ["에러"] });
    await waitFor(() => fireEvent.press(getByText("확인")));

    mockChangePassword({ new_password1: ["에러"] });
    await waitFor(() => fireEvent.press(getByText("확인")));

    mockChangePassword({ new_password2: ["에러"] });
    await waitFor(() => fireEvent.press(getByText("확인")));

    mockChangePassword({ non_field_errors: ["에러"] });
    await waitFor(() => fireEvent.press(getByText("확인")));

    mockChangePassword({});
    await waitFor(() => fireEvent.press(getByText("확인")));

    jest.spyOn(account, "changePassword").mockImplementationOnce(() =>
      Promise.resolve({
        status: 500,
        data: {},
      })
    );
    await waitFor(() => fireEvent.press(getByText("확인")));
  });
});
