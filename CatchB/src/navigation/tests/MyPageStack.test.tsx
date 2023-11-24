import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyPageContainer from "../MyPageStack";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

const Tab = createBottomTabNavigator();

describe("<MyPageStack />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="MyPage"
            component={MyPageContainer}
            options={{
              headerTitle: "",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  });
});
