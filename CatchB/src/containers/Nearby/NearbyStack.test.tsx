/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NearbyStack from "./NearbyStack";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
  };
});
jest.mock("./Main/NearbyMain", () => {
  const { View, TouchableOpacity } = jest.requireActual("react-native");

  return () => {
    const navigation = jest
      .requireActual("@react-navigation/native")
      .useNavigation();
    return (
      <View>
        <TouchableOpacity
          testID="facility-detail-button"
          onPress={() => navigation.navigate("FacilityDetail")}
        />
        <TouchableOpacity
          testID="facility-reserve-button"
          onPress={() => navigation.navigate("FacilityReserve")}
        />
        <TouchableOpacity
          testID="coach-detail-button"
          onPress={() => navigation.navigate("CoachDetail")}
        />
        <TouchableOpacity
          testID="payment-button"
          onPress={() => navigation.navigate("Payment")}
        />
      </View>
    );
  };
});
jest.mock("./FacilityDetail/FacilityDetail", () => "FacilityDetail");
jest.mock("./FacilityReserve/FacilityReserve", () => "FacilityReserve");
jest.mock("./CoachDetail/CoachDetail", () => "CoachDetail");
jest.mock("./Payment/Payment", () => "Payment");
jest.mock("../../components/Buttons", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");
  return {
    BackButton: ({ onPress }: { onPress: () => void }) => {
      return <TouchableOpacity onPress={onPress} testID="back" />;
    },
  };
});

const Tab = createBottomTabNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Nearby" component={NearbyStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

describe("<NearbyStack />", () => {
  it("renders and navigates correctly", async () => {
    const { getByTestId } = renderWithProviders(<Components />);

    fireEvent.press(getByTestId("facility-detail-button"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("facility-reserve-button"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("payment-button"));
    fireEvent.press(getByTestId("back"));
  });
});
