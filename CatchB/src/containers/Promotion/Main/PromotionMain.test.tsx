import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PromotionMain from "./PromotionMain";
import { renderWithProviders } from ".utils/test-utils";

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PromotionMain" component={PromotionMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<PromotionMain />", () => {
  it("renders", () => {
    render();
  });
});
