import { NavigationContainer } from "@react-navigation/native";

import CalendarStack from "./CalendarStack";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));

describe("<CalendarStack />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <NavigationContainer>
        <CalendarStack />
      </NavigationContainer>
    );
  });
});
