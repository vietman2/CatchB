import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyPageContainer from "./MyPageStack";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("./MyPage", () => "MyPage");
jest.mock("../../components/Logos/TopBar", () => ({
  leftTitle: () => "leftTitle",
  rightTitle: () => "rightTitle",
}));

const Tab = createBottomTabNavigator();

describe("<MyPageStack />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="MyPage"
            component={MyPageContainer}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  });
});
