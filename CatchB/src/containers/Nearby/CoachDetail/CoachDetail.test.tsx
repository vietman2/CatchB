import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CoachDetail from "./CoachDetail";
import { sampleCoaches } from "../../../variables/mvp_dummy_data/coaches";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Icon: "Icon",
    Text: "Text",
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../../../components/Tables/LessonProductsTable", () => "LessonProductsTable");

const Stack = createStackNavigator();

const components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CoachDetail" component={CoachDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<CoachDetail />", () => {
  it("handles like button", async () => {
    const { getByTestId } = renderWithProviders(components(), {
      preloadedState: {
        coach: {
          selectedCoach: sampleCoaches[0],
        },
      },
    });

    const likeButton = getByTestId("like");
    await waitFor(() => fireEvent.press(likeButton));
  });
});
