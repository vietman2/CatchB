import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HistoryStack from "./HistoryStack";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;

  return {
    PaperProvider: Provider,
  };
});
jest.mock("./Main", () => "HistoryMain");
jest.mock(".components/Logos", () => {
  const { Text } = jest.requireActual("react-native");
  return {
    SmallLogo: () => {
      return <Text>SmallLogo</Text>;
    },
  };
});

const Tab = createBottomTabNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="History" component={HistoryStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

describe("<HistoryStack />", () => {
  it("renders", () => {
    renderWithProviders(<Components />);
  });
});
