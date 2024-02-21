/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeMain from "./";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Text: "Text",
  };
});
jest.mock("./Normal", () => "Normal");
jest.mock("./Pro", () => "Pro");
jest.mock("../StoreDashboard", () => "StoreDashboard");
jest.mock("../Sales/Sales", () => "Sales");
jest.mock("../Calendar", () => "Calendar");

const Stack = createStackNavigator();

describe("<HomeMain />", () => {
  it("renders", () => {
    renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeMain" component={HomeMain} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  });
});
