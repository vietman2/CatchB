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
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Searchbar: "Searchbar",
    FAB: ({ label, onPress }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{label}</Text>
      </TouchableOpacity>
    ),
    Portal: "Portal",
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
  it("renders correctly and handles FAB press", async () => {
    const { getByText } = renderWithProviders(components());

    fireEvent.press(getByText("인기순"));
  });
});
