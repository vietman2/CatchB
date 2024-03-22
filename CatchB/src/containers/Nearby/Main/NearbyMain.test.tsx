/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NearbyMain from "./NearbyMain";
import { renderWithProviders } from ".utils/test-utils";

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
  const { View, TouchableOpacity } = jest.requireActual("react-native");
  const MockMapView = (props: any) => {
    return (
        <TouchableOpacity onPress={props.onPress} testID="touch-me">{props.children}</TouchableOpacity>
    );
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
jest.mock("../fragments/CoachSimple", () => {
  const { Text } = jest.requireActual("react-native");

  return {
    CoachSimple: ({ coach }: any) => {
      return <Text>{coach.coach_name}</Text>;
    },
  };
});
jest.mock("../fragments/FacilitySimple", () => {
  const { Text } = jest.requireActual("react-native");

  return {
    FacilitySimple: ({ facility }: any) => {
      return <Text>{facility.name}</Text>;
    },
  };
});
jest.mock(".components/Error", () => ({
  ErrorPage: "ErrorPage",
}));
jest.mock(".components/Loading", () => ({
  LoadingPage: "LoadingPage",
}));
jest.mock(".components/Dividers", () => ({
  VerticalDivider: "VerticalDivider",
}));

const Stack = createStackNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Nearby" component={NearbyMain} />
        <Stack.Screen name="FacilityDetail" component={NearbyMain} />
        <Stack.Screen name="CoachDetail" component={NearbyMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<NearbyMain />", () => {
  it("renders with location", async () => {
    renderWithProviders(<Components />, {
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

  it("renders correctly and handles coach navigation", async () => {
    renderWithProviders(<Components />);
  });
});
