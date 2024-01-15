import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FacilityDetail from "./FacilityDetail";
import { renderWithProviders } from "../../../utils/test-utils";
import { sampleFacilities } from "../../../variables/mvp_dummy_data/facilities";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => ({
  ...jest.requireActual("react-native-paper"),
  Icon: "Icon",
  Text: "Text",
}));

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
  it("renders correctly", () => {
    renderWithProviders(components(), {
      preloadedState: {
        facility: {
          selectedFacility: sampleFacilities[0],
        },
      },
    });
  });

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
});
