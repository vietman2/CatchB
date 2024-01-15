import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as expoLocation from "expo-location";

import NearbyStack from "./NearbyStack";
import { renderWithProviders } from "../../utils/test-utils";
import { sampleFacilities } from "../../variables/mvp_dummy_data/facilities";

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
    Icon: "Icon",
    IconButton: "IconButton",
    FAB: "FAB",
    Portal: "Portal",
  };
});
jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  const MockMapView = (props: any) => {
    return <View>{props.children}</View>;
  };
  const MockMarker = (props: any) => {
    return <View>{props.children}</View>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    PROVIDER_GOOGLE: "PROVIDER_GOOGLE",
  };
});
jest
  .spyOn(expoLocation, "getCurrentPositionAsync")
  .mockImplementation(async () => {
    return Promise.resolve({
      coords: {
        latitude: 37.5326,
        longitude: 127.024612,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: 1627663200000,
    });
  });
jest.mock(
  "../../components/BottomSheets/MapBottomSheet",
  () => "MapBottomSheet"
);

const Tab = createBottomTabNavigator();

const components = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Nearby" component={NearbyStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

describe("<NearbyStack />", () => {
  it("handles navigate to FacilityDetail and back", async () => {
    const { getByTestId, getByText } = renderWithProviders(components(), {
      preloadedState: {
        facility: {
          selectedFacility: sampleFacilities[0],
        },
      },
    });

    const facility = getByText("JT 야구 레슨장");
    await waitFor(() => fireEvent.press(facility));

    const backButton = getByTestId("back");
    waitFor(() => fireEvent.press(backButton));
  });
});
