import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from "./HomeStack";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Badge: "Badge",
    Icon: "Icon",
  };
});
jest.mock("./Main", () => "HomeMain");
jest.mock("../../components/Logos", () => {
  const { Text } = jest.requireActual("react-native");
  return {
    SmallLogo: () => {
      return <Text>SmallLogo</Text>;
    },
  };
});

const Tab = createBottomTabNavigator();

describe("<HomeStack />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStack} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  });
});
