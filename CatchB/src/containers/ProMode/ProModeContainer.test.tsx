import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProMode from "./ProModeContainer";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;

  return {
    PaperProvider: Provider,
    Badge: "Badge",
    Icon: "Icon",
    Text: "Text",
  };
});
jest.mock("./Home/ProHome", () => ({
  ProHome: "ProHome",
}));
jest.mock("./Calendar/Calendar", () => ({
  Calendar: "Calendar",
}));
jest.mock("./StoreDashboard/StoreDashboard", () => ({
  StoreDashboard: "StoreDashboard",
}));
jest.mock("./Sales/Sales", () => ({
  Sales: "Sales",
}));
jest.mock("../../components/Logos", () => ({
  SmallLogo: () => "SmallLogo",
}));

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
