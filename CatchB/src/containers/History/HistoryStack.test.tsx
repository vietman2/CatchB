import { NavigationContainer } from "@react-navigation/native";

import HistoryStack from "./HistoryStack";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));

describe("<HistoryStack />", () => {
  it("renders", () => {
    renderWithProviders(
      <NavigationContainer>
        <HistoryStack />
      </NavigationContainer>
    );
  });
});
