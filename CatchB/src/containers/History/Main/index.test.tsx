import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HistoryMain from "./";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;

  return {
    PaperProvider: Provider,
    Text: "Text",
  };
});

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HistoryMain" component={HistoryMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

describe("<HistoryMain />", () => {
  it("renders", () => {
    render();
  });
});
