import { fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { renderWithProviders } from "../../utils/test-utils";
import MyStore from "./MyStore";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock(
  "../../containers/StoreDashboard/StoreDashboard",
  () => "StoreDashboard"
);
jest.mock("../../containers/TaskBoard/TaskBoard", () => "TaskBoard");

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MyStore"
          component={MyStore}
          options={{
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<MyStore />", () => {
  it("renders correctly", () => {
    render();
  });

  it("handles tab press", () => {
    const { getByText } = render();
    fireEvent.press(getByText("대시보드"));
    fireEvent.press(getByText("매출관리"));
    fireEvent.press(getByText("예약관리"));
    fireEvent.press(getByText("업무관리"));
    fireEvent.press(getByText("고객관리"));
  });
});
