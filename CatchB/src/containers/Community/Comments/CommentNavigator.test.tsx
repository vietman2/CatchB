import { NavigationContainer } from "@react-navigation/native";

import CommentNavigator from "./CommentNavigator";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
  };
});
jest.mock("./CommentList", () => ({
  CommentList: "CommentList",
}));

describe("<CommentNavigator />", () => {
  it("should render properly", () => {
    renderWithProviders(
      <NavigationContainer>
        <CommentNavigator />
      </NavigationContainer>
    );
  });
});
