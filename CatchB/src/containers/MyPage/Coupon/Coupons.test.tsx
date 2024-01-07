import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CouponList from "./CouponList";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("expo-linear-gradient", () => "LinearGradient");

const Stack = createStackNavigator();

describe("<CouponList />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CouponList" component={CouponList} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  });
});
