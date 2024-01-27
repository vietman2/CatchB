import { fireEvent } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CommunityMain from "./CommunityMain";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Text: "Text",
    FAB: ({ label, onPress }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{label}</Text>
      </TouchableOpacity>
    ),
    TextInput: {
      ...jest.requireActual("react-native-paper").TextInput,
      Icon: "Icon",
    },
  };
});

const Stack = createStackNavigator();

const components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CommunityScreen" component={CommunityMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<Community />", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(components());

    fireEvent.press(getByText("모집"));
    fireEvent.press(getByText("야구톡"));
  });
});
