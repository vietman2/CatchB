import { fireEvent } from "@testing-library/react-native";

import Home from "./Home";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { View, TouchableOpacity } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Banner: ({ visible, actions, icon, children }: any) => {
      if (visible) {
        return (
          <View>
            {icon}
            {children}
            {actions.map(({ label, onPress }: any) => (
              <TouchableOpacity
                key={label}
                onPress={onPress}
                accessibilityLabel={label}
              />
            ))}
          </View>
        );
      } else {
        return null;
      }
    },
    Text: "Text",
    Icon: "Icon",
  };
});
jest.mock("../../components/Buttons/IconButton", () => "IconButton");
jest.mock("../../components/Chips/Chips", () => ({
  NotificationChip: () => "NotificationChip",
}));
jest.mock("../../components/Chips/Chips", () => ({
  NotificationChip: () => "NotificationChip",
}));
jest.mock("../../components/Cards/SimpleCard", () => "SimpleCard");
jest.mock("../../components/Cards/CardBox", () => "CardBox");

describe("Home", () => {
  it("renders correctly", () => {
    renderWithProviders(<Home />);
  });

  it("renders correctly when mode is pro", () => {
    renderWithProviders(<Home />, {
      preloadedState: { mode: { mode: "pro" } },
    });
  });

  it("handles banner press", () => {
    const { getByTestId, getByLabelText } = renderWithProviders(<Home />);
    
    fireEvent.press(getByLabelText("닫기"));
    fireEvent.press(getByTestId("banner"));
  });
});
