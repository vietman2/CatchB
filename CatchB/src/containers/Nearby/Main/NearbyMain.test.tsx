/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NearbyMain from "./NearbyMain";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Searchbar: "Searchbar",
    Text: "Text",
  };
});
jest.mock("react-native-maps", () => {
  const { View } = jest.requireActual("react-native");
  const MockMapView = (props: any) => {
    return <View>{props.children}</View>;
  };
  const MockMarker = (props: any) => {
    return <View>{props.children}</View>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    MapMarker: MockMarker,
    PROVIDER_GOOGLE: "PROVIDER_GOOGLE",
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../FacilityDetail/FacilitySimple", () => "FacilitySimple");
jest.mock("../CoachDetail/CoachSimple", () => "CoachSimple");

const Stack = createStackNavigator();

const components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Nearby" component={NearbyMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("Nearby", () => {
  it("renders correctly and handles mode switch", async () => {
    const { getByText } = renderWithProviders(components());

    fireEvent.press(getByText("시설"));
  });

  it("renders with location", async () => {
    renderWithProviders(components(), {
      preloadedState: {
        general: {
          location: {
            coords: {
              latitude: 37.5326,
              longitude: 127.024612,
              altitude: 0,
              accuracy: 0,
              heading: 0,
              speed: 0,
              altitudeAccuracy: 0,
            },
            timestamp: 0,
          },
          mode: "basic",
        },
      },
    });
  });
});
