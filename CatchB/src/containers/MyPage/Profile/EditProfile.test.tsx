import { fireEvent, waitFor } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import EditProfile from "./EditProfile";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    PaperProvider: Provider,
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Text: "Text",
    TextInput: "TextInput",
  };
});

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          initialParams={{
            title: "title",
            detail: "detail",
          }}
        />
        <Stack.Screen name="Profile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<EditProfile />", () => {
  it("should handle text input and button press", () => {
    const { getByTestId, getByText } = render();

    const textInput = getByTestId("edit-profile-text-input");
    const button = getByText("확인");

    waitFor(() => {
      fireEvent.press(button);
      fireEvent.changeText(textInput, "new detail");
      fireEvent.press(button);
      fireEvent.changeText(textInput, "");
      fireEvent.press(button);
    });
  });
});
