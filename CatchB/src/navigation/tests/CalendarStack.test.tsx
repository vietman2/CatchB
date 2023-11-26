import { NavigationContainer } from "@react-navigation/native";

import { renderWithProviders } from "../../utils/test-utils";
import CalendarStack from "../CalendarStack";

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
