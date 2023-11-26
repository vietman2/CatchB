import { act, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { renderWithProviders } from "../../utils/test-utils";
import MyPage from "../MyPage";
import { admin } from "../../variables/mvp_dummy_data/user";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const { View } = require("react-native");
  return {
    ...jest.requireActual("react-native-paper"),
    Avatar: {
      Icon: (props: any) => <View testID="avatar-icon" {...props} />,
    },
  };
});

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
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
    </NavigationContainer>
  );
}

describe("MyPage", () => {
  it("renders correctly", async () => {
    render();
  });

  it("navigates to Login screen when user is not logged in", async () => {
    const { getByText } = render();
    await act(() => {
      fireEvent.press(getByText("로그인"));
    });
  });
  it("handles user badge press when user is logged in", async () => {
    const { getByText } = renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MyPage"
            component={MyPage}
            options={{
              headerTitle: "",
            }}
          />
          <Stack.Screen name="Profile" component={MyPage} />
        </Stack.Navigator>
      </NavigationContainer>,
      {
        preloadedState: {
          auth: {
            token: "token",
            user: admin,
          },
        },
      }
    );
    await act(() => {
      fireEvent.press(getByText("관 리자"));
    });
  });
});
