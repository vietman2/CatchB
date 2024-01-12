import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as expoLocation from "expo-location";

import Nearby from "./Nearby";
import { renderWithProviders } from "../../utils/test-utils";
import { waitFor } from "@testing-library/react-native";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Searchbar: "Searchbar",
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
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../../components/Facility/FacilitySimple", () => "FacilitySimple");

const Stack = createStackNavigator();

const components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Nearby" component={Nearby} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("Nearby", () => {
  it("renders correctly", async () => {
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
    await waitFor(() => renderWithProviders(components()));
  });
});
