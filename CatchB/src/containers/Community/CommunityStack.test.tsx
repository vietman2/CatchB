import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CommunityStack from "./CommunityStack";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.requireActual("react-native-paper");
jest.mock("@react-navigation/drawer", () => ({
  createDrawerNavigator: () => {
    return {
      Navigator: "Navigator",
      Screen: "Screen",
    };
  },
}));
jest.mock("../../components/Logos/TopBar", () => ({
  leftTitle: "leftTitle",
  rightTitle: "rightTitle",
}));
jest.mock("../../containers/Community/Community", () => "Community");

const Tab = createBottomTabNavigator();

describe("<CommunityStack />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Community" component={CommunityStack} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  });
});
