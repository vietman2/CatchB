import { NavigationContainer } from "@react-navigation/native";

import PromotionContainer from "./PromotionStack";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));

describe("<PromotionContainer />", () => {
  it("renders", () => {
    renderWithProviders(
      <NavigationContainer>
        <PromotionContainer />
      </NavigationContainer>
    );
  });
});
