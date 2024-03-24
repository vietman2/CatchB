/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NearbyMain from "./NearbyMain";
import { sampleCoaches, sampleFacilities } from ".data/products";
import * as CoachAPI from ".services/products/coach";
import * as FacilityAPI from ".services/products/facility";
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
      <TouchableOpacity onPress={props.onPress} testID="touch-me">
        {props.children}
      </TouchableOpacity>
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
jest.mock("../fragments", () => {
  const { Text } = jest.requireActual("react-native");

  return {
    CoachSimple: ({ coach }: any) => {
      return <Text>{coach.name}</Text>;
    },
    FacilitySimple: ({ facility }: any) => {
      return <Text>{facility.name}</Text>;
    },
  };
});
jest.mock(".components/Error", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    ErrorPage: ({ onRefresh }: any) => {
      return (
        <TouchableOpacity onPress={onRefresh}>
          <Text>ErrorPage</Text>
        </TouchableOpacity>
      );
    },
  };
});
jest.mock(".components/Loading", () => ({
  LoadingPage: "LoadingPage",
}));
jest.mock(".components/Dividers", () => ({
  VerticalDivider: "VerticalDivider",
}));
jest.mock(".components/ScrollView", () => ({
  ScrollView: "ScrollView",
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
  it("renders location and error page", async () => {
    jest.spyOn(CoachAPI, "getCoachList").mockResolvedValue({
      status: 400,
      data: [],
    });
    jest.spyOn(FacilityAPI, "getFacilityList").mockResolvedValue({
      status: 400,
      data: [],
    });

    const { getByText } = await waitFor(() =>
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
      })
    );

    waitFor(() => fireEvent.press(getByText("ErrorPage")));
  });

  it("renders correctly and handles coach navigation", async () => {
    jest.spyOn(CoachAPI, "getCoachList").mockResolvedValue({
      status: 200,
      data: sampleCoaches,
    });
    jest.spyOn(FacilityAPI, "getFacilityList").mockResolvedValue({
      status: 200,
      data: sampleFacilities,
    });

    const { getByText } = await waitFor(() =>
      renderWithProviders(<Components />)
    );

    waitFor(() => {
      fireEvent.press(getByText("코치"));
      fireEvent.press(getByText("이승엽"));
      fireEvent.press(getByText("시설"));
      fireEvent.press(getByText("서울대 야구장"));
    });
  });
});
