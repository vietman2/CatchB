/* eslint-disable @typescript-eslint/no-explicit-any */
import { waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import FacilityDetail from "./FacilityDetail";
import { sampleFacilities } from ".data/products";
import * as FacilityAPI from ".services/products/facility";
import { renderWithProviders } from ".utils/test-utils";

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
jest.mock(".components/Error", () => ({
  ErrorPage: "ErrorPage",
}));
jest.mock(".components/Loading", () => ({
  LoadingPage: "LoadingPage",
}));
jest.mock(".components/Profile", () => ({
  AvatarIcon: "AvatarIcon",
}));
jest.mock(".components/Tables", () => ({
  TimeBar: "TimeBar",
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

jest.spyOn(FacilityAPI, "getFacilityDetail").mockResolvedValue({
  status: 200,
  data: sampleFacilities[0],
});

describe("<FacilityDetail />", () => {
  it("handles buttons", async () => {
    waitFor(() =>
      renderWithProviders(<Components />, {
        preloadedState: {
          facility: {
            selectedFacilityId: sampleFacilities[0].uuid,
            myFacilityUuid: "1234",
          },
        },
      })
    );
  });
});
