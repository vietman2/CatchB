import { NavigationContainer } from "@react-navigation/native";

import HomeStack from "./HomeStack";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("./Main/HomeMain", () => "HomeMain");
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
