import { NavigationContainer } from "@react-navigation/native";
import { fireEvent } from "@testing-library/react-native";

import TabContainer from "../TabStack";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));

describe("TabContainer", () => {
  it("renders all tabs with correct properties", () => {
    renderWithProviders(
      <NavigationContainer>
        <TabContainer />
      </NavigationContainer>
    );
  });

  it("handles long press", () => {
    const { getAllByTestId } = renderWithProviders(
      <NavigationContainer>
        <TabContainer />
      </NavigationContainer>
    );
    const tab = getAllByTestId("MyPageIcon")[0];

    fireEvent(tab, "onLongPress");
    fireEvent(tab, "onLongPress");
  });
});
