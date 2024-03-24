/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CoachDetail from "./CoachDetail";
import { sampleCoaches, sampleCoachInfos } from ".data/products";
import * as CoachAPI from ".services/products/coach";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Button: ({ onPress, children, testID }: any) => (
      <TouchableOpacity onPress={onPress} testID={testID}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Icon: "Icon",
    Text: "Text",
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../fragments", () => ({
  Stats: "Stats",
  TitleText: "TitleText",
}));
jest.mock(".components/Error", () => ({
  ErrorPage: "ErrorPage",
}));
jest.mock(".components/Loading", () => ({
  LoadingPage: "LoadingPage",
}));
jest.mock(".components/Tables", () => ({
  LessonsTable: "LessonsTable",
}));

const Stack = createStackNavigator();

const Components = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CoachDetail" component={CoachDetail} />
        <Stack.Screen name="Payment" component={CoachDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const render = () => {
  return renderWithProviders(<Components />, {
    preloadedState: {
      coach: {
        selectedCoachId: sampleCoaches[0].uuid,
        myCoachUuid: "1",
      },
    },
  });
};

describe("<CoachDetail />", () => {
  it("renders error page correctly", async () => {
    jest
      .spyOn(CoachAPI, "getCoachDetail")
      .mockImplementation(() =>
        Promise.resolve({ status: 400, data: "Bad Request" })
      );

    waitFor(() => render());
  });

  it("renders coach details correctly (short intro)", async () => {
    jest
      .spyOn(CoachAPI, "getCoachDetail")
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: sampleCoachInfos[0] })
      );

    const { getByTestId } = await waitFor(() => render());

    waitFor(() => fireEvent.press(getByTestId("apply-button")));
  });

  it("renders coach details correctly (long intro)", async () => {
    jest
      .spyOn(CoachAPI, "getCoachDetail")
      .mockImplementation(() =>
        Promise.resolve({ status: 200, data: sampleCoachInfos[1] })
      );

    const { getByTestId } = await waitFor(() => render());

    waitFor(() => fireEvent.press(getByTestId("expand-collapse")));
  });
});
