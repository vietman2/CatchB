import { act, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TaskBoard from "./TaskBoard";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("../../components/ProgressBar/Progress", () => ({
  CheckStatus: "CheckStatus",
  ProgressBanner: "ProgressBanner",
}));

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MyStoreScreen" component={TaskBoard} />
        <Stack.Screen name="WorkProgress" component={TaskBoard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<TaskBoard />", () => {
  it("renders correctly", () => {
    render();
  });

  it("navigates to WorkProgress screen when clicked", async () => {
    const { getByTestId } = render();

    await act(async () => {
      fireEvent.press(getByTestId("WorkProgressTouchable"));
    });
  });
});
