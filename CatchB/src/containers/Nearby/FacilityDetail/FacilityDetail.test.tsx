/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FacilityDetail from "./FacilityDetail";
import { renderWithProviders } from ".utils/test-utils";
import { sampleFacilities } from "../../../variables/mvp_dummy_data/facilities";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    ...jest.requireActual("react-native-paper"),
    Icon: "Icon",
    Button: ({ onPress, children, testID }: any) => (
      <TouchableOpacity onPress={onPress} testID={testID}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Text: "Text",
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock(".components/Profile", () => ({
  AvatarIcon: "AvatarIcon",
}));
jest.mock(".components/Tables", () => ({
  TimeBar: "TimeBar",
  ReservationsTable: "ReservationsTable",
}));

const Stack = createStackNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FacilityDetail" component={FacilityDetail} />
        <Stack.Screen name="FacilityReserve" component={FacilityDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<FacilityDetail />", () => {
  it("handles buttons", async () => {
    const { getByTestId } = renderWithProviders(<Components />, {
      preloadedState: {
        facility: {
          selectedFacility: sampleFacilities[0],
          myFacilityUuid: "1234",
        },
      },
    });

    const likeButton = getByTestId("like");
    waitFor(() => {
      fireEvent.press(likeButton);
      fireEvent.press(getByTestId("reserve-button"));
    });
  });

  it("handles long descriptions", async () => {
    const { getByTestId } = renderWithProviders(<Components />, {
      preloadedState: {
        facility: {
          selectedFacility: sampleFacilities[1],
          myFacilityUuid: "1235",
        },
      },
    });

    waitFor(() => {
      fireEvent.press(getByTestId("expand-collapse"));
      fireEvent.press(getByTestId("expand-collapse"));
    });
  });
});
