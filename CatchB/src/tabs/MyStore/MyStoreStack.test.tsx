import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyStoreContainer from "./MyStoreStack";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("../../components/Logos/TopBar", () => ({
  leftTitle: () => "leftTitle",
  rightTitle: () => "rightTitle",
}));
jest.mock("../../containers/mystore/WorkProgress", () => "WorkProgress");
jest.mock("./MyStore", () => "MyStore");

const Tab = createBottomTabNavigator();

describe("<MyStoreStack />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="MyStore"
            component={MyStoreContainer}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  });
});
