import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CoachDetail from "./CoachDetail";
import { renderWithProviders } from "../../../utils/test-utils";
import { sampleCoaches } from "../../../variables/mvp_dummy_data/coaches";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  return {
    ...jest.requireActual("react-native-paper"),
    Icon: "Icon",
    Text: "Text",
  };
});

const Stack = createStackNavigator();

const components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CoachDetail" component={CoachDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<CoachDetail />", () => {
  it("handles like button", async () => {
    renderWithProviders(components(), {
      preloadedState: {
        coach: {
          selectedCoach: sampleCoaches[0],
        },
      },
    });
  });
});
