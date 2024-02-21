import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Normal from "./";
import { renderWithProviders } from "../../../../utils/test-utils";
import { admin } from "../../../../variables/mvp_dummy_data/user";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;

  return {
    PaperProvider: Provider,
    Chip: "Chip",
    Icon: "Icon",
    Surface: "Surface",
    Text: "Text",
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");

const Stack = createStackNavigator();

function Components() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeMain" component={Normal} />
        <Stack.Screen name="Nearby" component={Normal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

describe("<Normal />", () => {
  it("renders with user", () => {
    renderWithProviders(<Components />, {
      preloadedState: {
        general: { mode: "basic", location: null },
        auth: { user: admin, token: "" },
      },
    });
  });

  it("renders without user, and handles navigation", () => {
    const { getByText } = renderWithProviders(<Components />, {
      preloadedState: {
        general: { mode: "basic", location: null },
        auth: { user: null, token: "" },
      },
    });

    waitFor(() => {
      fireEvent.press(getByText("아카데미 예약"));
      fireEvent.press(getByText("레슨"));
    });
  });
});
