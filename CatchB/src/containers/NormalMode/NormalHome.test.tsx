import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NormalHome from "./NormalHome";
import { renderWithProviders } from "../../utils/test-utils";
import { admin } from "../../variables/mvp_dummy_data/user";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;

  return {
    PaperProvider: Provider,
    Surface: "Surface",
    Text: "Text",
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("./fragments", () => ({
  CoachPreview: "CoachPreview",
  CoachTypes: "CoachTypes",
  Filters: "Filters",
  Shortcut: "Shortcut",
}));

const Stack = createStackNavigator();

function Components() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Normal" component={NormalHome} />
        <Stack.Screen name="Nearby" component={NormalHome} />
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
