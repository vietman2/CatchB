import { NavigationContainer } from "@react-navigation/native";

import { renderWithProviders } from "../../utils/test-utils";
import CommunityStack from "../CommunityStack";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));

describe("<CommunityStack />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <NavigationContainer>
        <CommunityStack />
      </NavigationContainer>
    );
  });
});
