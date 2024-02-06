import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
    Button: "Button",
    Avatar: "Avatar",
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
    MapMarker: MockMarker,
    PROVIDER_GOOGLE: "PROVIDER_GOOGLE",
  };
});
jest.mock(
  "../../components/BottomSheets/MapBottomSheet",
  () => "MapBottomSheet"
);
jest.mock("./FacilityDetail/FacilityDetail", () => "FacilityDetail");

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

    const facility = getByText("캐치비 레슨장");
    await waitFor(() => fireEvent.press(facility));

    const backButton = getByTestId("back");
    waitFor(() => fireEvent.press(backButton));
  });
});
