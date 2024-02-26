/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Prices from "./Prices";
import { renderWithProviders } from "../../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const { Text, TouchableOpacity } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Text: "Text",
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
  };
});

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CoachRegister" component={Prices} />
        <Stack.Screen name="MyPageScreen" component={Prices} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<Prices />", () => {
  it("renders correctly and handles submit", () => {
    const { getByText } = render();

    fireEvent.press(getByText("완료"));
  });
});
