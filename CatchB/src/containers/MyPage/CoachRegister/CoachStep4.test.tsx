/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CoachStep4 from "./CoachStep4";
import { renderWithProviders } from "../../../utils/test-utils";

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
        <Stack.Screen name="CoachRegister" component={CoachStep4} />
        <Stack.Screen name="MyPageScreen" component={CoachStep4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<CoachStep4 />", () => {
  it("renders correctly and handles submit", () => {
    const { getByText } = render();

    fireEvent.press(getByText("완료"));
  });
});
