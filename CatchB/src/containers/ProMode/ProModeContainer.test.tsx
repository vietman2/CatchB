import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProMode from "./ProModeContainer";
import { renderWithProviders } from "../../utils/test-utils";

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
jest.mock("./Home/ProHome", () => {
  return {
    ProHome: "ProHome",
  };
});
jest.mock("./Calendar/Calendar", () => {
  return {
    Calendar: "Calendar",
  };
});
jest.mock("./StoreDashboard/StoreDashboard", () => {
  return {
    StoreDashboard: "StoreDashboard",
  };
});
jest.mock("./Sales/Sales", () => {
  return {
    Sales: "Sales",
  };
});

const Tab = createBottomTabNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={ProMode} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

describe("<ProMode />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Components />);
  });
});
