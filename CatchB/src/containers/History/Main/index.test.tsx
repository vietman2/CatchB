import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HistoryMain from "./";
import { renderWithProviders } from "../../../utils/test-utils";

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HistoryMain" component={HistoryMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

describe("<HistoryMain />", () => {
  it("renders", () => {
    render();
  });
});
