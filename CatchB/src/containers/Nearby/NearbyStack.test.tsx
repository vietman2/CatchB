import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NearbyStack from "./NearbyStack";
import { renderWithProviders } from "../../utils/test-utils";
import { sampleFacilities } from "../../variables/mvp_dummy_data/facilities";
import { sampleCoaches } from "../../variables/mvp_dummy_data/coaches";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Searchbar: "Searchbar",
    Text: "Text",
    Icon: "Icon",
    IconButton: "IconButton",
    FAB: "FAB",
    Portal: "Portal",
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress} accessibilityLabel="버튼">
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
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
jest.mock("../../components/Avatar/CoachProfile", () => "CoachProfile");

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
  it("handles navigation to all Facility pages and back", async () => {
    const { getByTestId, getByText } = renderWithProviders(components(), {
      preloadedState: {
        facility: {
          selectedFacility: sampleFacilities[0],
        },
      },
    });

    await waitFor(() => fireEvent.press(getByText("캐치비 레슨장")));
    await waitFor(() => fireEvent.press(getByText("예약하기")));
    await waitFor(() => fireEvent.press(getByText("결제하기")));

    const backButton = getByTestId("back");
    waitFor(() => fireEvent.press(backButton));
    waitFor(() => fireEvent.press(backButton));
    waitFor(() => fireEvent.press(backButton));
  });

  it("handles navigation to all Coach pages and back", async () => {
    const { getByTestId, getByText } = renderWithProviders(components(), {
      preloadedState: {
        coach: {
          selectedCoach: sampleCoaches[0],
        },
      },
    });

    await waitFor(() => fireEvent.press(getByText("코치")));
    await waitFor(() => fireEvent.press(getByText("홍승우 코치")));

    const backButton = getByTestId("back");
    waitFor(() => fireEvent.press(backButton));
    await waitFor(() => fireEvent.press(getByText("시설")));
  });
});
