/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CoachDetail from "./CoachDetail";
import { sampleCoaches } from ".data/products";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Button: ({ onPress, children, testID }: any) => (
      <TouchableOpacity onPress={onPress} testID={testID}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Icon: "Icon",
    Text: "Text",
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock(".components/Tables", () => ({
  LessonsTable: "LessonsTable",
}));

const Stack = createStackNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CoachDetail" component={CoachDetail} />
        <Stack.Screen name="Payment" component={CoachDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<CoachDetail />", () => {
  it("handles like button", async () => {
    const { getByTestId } = renderWithProviders(<Components />, {
      preloadedState: {
        coach: {
          selectedCoachId: sampleCoaches[0].uuid,
          myCoachUuid: "1",
        },
      },
    });

    waitFor(() => {
      fireEvent.press(getByTestId("like"));
      fireEvent.press(getByTestId("apply-button"));
    });
  });
});
