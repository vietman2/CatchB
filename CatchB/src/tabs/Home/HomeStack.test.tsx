import { NavigationContainer } from "@react-navigation/native";

import { renderWithProviders } from "../../utils/test-utils";
import HomeStack from "./HomeStack";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("./Home", () => "Home");
jest.mock("../../components/Logos/TopBar", () => ({
  leftTitle: () => "leftTitle",
  rightTitle: () => "rightTitle",
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
