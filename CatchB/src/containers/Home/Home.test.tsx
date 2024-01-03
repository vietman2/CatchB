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
jest.mock("../../components/Buttons/SurfaceButton", () => "SurfaceButton");
jest.mock("../../components/Chips/Chips", () => ({
  NotificationChip: () => "NotificationChip",
}));
jest.mock("../../components/Chips/Chips", () => ({
  NotificationChip: () => "NotificationChip",
}));
jest.mock("../../components/Cards/SimpleCard", () => "SimpleCard");
jest.mock("../../components/Cards/CardBox", () => "CardBox");
jest.mock("../../components/Buttons/TextButton", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");
  return ({ text, onPress }: any) => (
    <TouchableOpacity onPress={onPress}>
      <Text testID="text">{text}</Text>
    </TouchableOpacity>
  );
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");

const renderWithMode = (mode: "basic" | "pro") => {
  return renderWithProviders(<Home />, {
    preloadedState: { mode: { mode } },
  });
};

describe("<NormalHome />", () => {
  it("renders correctly", () => {
    renderWithMode("basic");
  });

  it("handles button press", () => {
    const { getByText } = renderWithMode("basic");

    fireEvent.press(getByText("개인정보 처리방침"));
    fireEvent.press(getByText("이용약관"));
    fireEvent.press(getByText("현재 버전 0.1.0"));
  });
});

describe("<ProHome />", () => {
  it("renders correctly", () => {
    renderWithMode("pro");
  });

  it("handles banner press", () => {
    const { getByTestId, getByLabelText } = renderWithMode("pro");

    fireEvent.press(getByLabelText("닫기"));
    fireEvent.press(getByTestId("banner"));
  });
});
