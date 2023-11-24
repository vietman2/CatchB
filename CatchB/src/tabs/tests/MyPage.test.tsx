import { act, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MyPage from "../MyPage";
import { renderWithProviders } from "../../utils/test-utils";
import { admin } from "../../variables/mvp_dummy_data/user";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));

const Stack = createStackNavigator();

describe("MyPage", () => {
  it("renders correctly", () => {
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
        </Stack.Navigator>
      </NavigationContainer>
    );
    expect(getByText("Catch B")).toBeTruthy();
    expect(getByText("캐치비")).toBeTruthy();
  });

  it("navigates to Login screen when user is not logged in", async () => {
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
          <Stack.Screen name="Login" component={MyPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
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
