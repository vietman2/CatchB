import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FacilityDetail from "./FacilityDetail";
import { renderWithProviders } from "../../../utils/test-utils";
import { sampleFacilities } from "../../../variables/mvp_dummy_data/facilities";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const { View, TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    ...jest.requireActual("react-native-paper"),
    Icon: "Icon",
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress} accessibilityLabel="버튼">
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Text: "Text",
  };
});
jest.mock("../../../components/Avatar/CoachProfile", () => "CoachProfile");
jest.mock("../../../components/Tables/ScheduleBar", () => "ScheduleBar");
jest.mock("../../../components/Tables/ProductsTable", () => "ProductsTable");

const Stack = createStackNavigator();

const components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FacilityDetail"
          component={FacilityDetail}
          options={{
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<FacilityDetail />", () => {
  it("handles like button", async () => {
    const { getByTestId } = renderWithProviders(components(), {
      preloadedState: {
        facility: {
          selectedFacility: sampleFacilities[0],
        },
      },
    });

    const likeButton = getByTestId("like");
    await waitFor(() => fireEvent.press(likeButton));
  });

  it("handles long descriptions", async () => {
    const { getByTestId } = renderWithProviders(components(), {
      preloadedState: {
        facility: {
          selectedFacility: sampleFacilities[1],
        },
      },
    });

    await waitFor(() => fireEvent.press(getByTestId("expand-collapse")));
    await waitFor(() => fireEvent.press(getByTestId("expand-collapse")));
  });
});
