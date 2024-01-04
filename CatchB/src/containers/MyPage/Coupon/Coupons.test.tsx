import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Coupons from "./Coupons";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("expo-linear-gradient", () => "LinearGradient");

const Stack = createStackNavigator();

describe("<Coupons />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Coupons" component={Coupons} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  });
});
