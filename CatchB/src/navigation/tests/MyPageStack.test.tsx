import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyPageContainer from "../MyPageStack";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-paper", () => {
  const { View } = require("react-native");
  return {
    ...jest.requireActual("react-native-paper"),
    Avatar: {
      Icon: (props: any) => <View testID="avatar-icon" {...props} />,
    },
  };
});
jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
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
