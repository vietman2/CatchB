/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { fireEvent, waitFor } from "@testing-library/react-native";

import FacilityReserve from "./FacilityReserve";
import { sampleFacilities } from ".data/products";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Button: ({ children, onPress }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Icon: "Icon",
    Text: "Text",
  };
});

const Stack = createStackNavigator();

const FakeComponent = () => {
  return <>FacilityReserve</>;
};

const Components = ({
  selectedDate,
  selectedTime,
  selectedProduct,
}: {
  selectedDate?: string;
  selectedTime?: string;
  selectedProduct?: any;
}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FacilityReserve"
          component={FacilityReserve}
          initialParams={{
            selectedDate: selectedDate,
            selectedTime: selectedTime,
            selectedProduct: selectedProduct,
          }}
        />
        <Stack.Screen name="Payment" component={FakeComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<FacilityReserve />", () => {
  it("renders with no params", () => {
    renderWithProviders(<Components />, {
      preloadedState: {
        facility: {
          selectedFacilityId: sampleFacilities[0].uuid,
          myFacilityUuid: "1234",
        },
      },
    });
  });

  it("renders with params and handles payment press", () => {
    const { getByText } = renderWithProviders(
      <Components
        selectedDate="2024-01-01"
        selectedTime="00:00"
        selectedProduct={{ title: "test" }}
      />,
      {
        preloadedState: {
          facility: {
            selectedFacilityId: sampleFacilities[0].uuid,
            myFacilityUuid: "1234",
          },
        },
      }
    );

    waitFor(() => {
      fireEvent.press(getByText("결제하기"));
    });
  });
});
