import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HistoryMain from "./HistoryMain";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("./", () => {
  return {
    NotReady: () => <></>,
  };
});

const Stack = createStackNavigator();

describe("<HistoryMain />", () => {
  it("renders", () => {
    renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HistoryMain" component={HistoryMain} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  });
});
