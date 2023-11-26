import { NavigationContainer } from "@react-navigation/native";

import { renderWithProviders } from "../../utils/test-utils";
import HomeStack from "../HomeStack";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));

describe("<HomeStack />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    );
  });
});
