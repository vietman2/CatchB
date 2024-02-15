import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MyStoreMain from "./MyStoreMain";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("../TaskBoard/TaskBoard", () => "TaskBoard");
jest.mock(
  "../ManageReservations/ManageReservations",
  () => "ManageReservations"
);

const Stack = createStackNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MyStore"
          component={MyStoreMain}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<MyStore />", () => {
  it("handles tab press", () => {
    const { getAllByText } = render();
    waitFor(() => {
      fireEvent.press(getAllByText("리뷰관리")[0]);
      fireEvent.press(getAllByText("예약관리")[0]);
      fireEvent.press(getAllByText("업무관리")[0]);
    });
  });
});
