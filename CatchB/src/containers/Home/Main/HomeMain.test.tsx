import { fireEvent } from "@testing-library/react-native";

import HomeMain from "./HomeMain";
import { renderWithProviders } from "../../../utils/test-utils";
import { admin } from "../../../variables/mvp_dummy_data/user";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { View, TouchableOpacity, Text } = jest.requireActual("react-native");

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
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress} accessibilityLabel="버튼">
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
  };
});
jest.mock("../../../components/Buttons/SurfaceButton", () => "SurfaceButton");
jest.mock("../../../components/Chips/Chips", () => ({
  NotificationChip: () => "NotificationChip",
}));
jest.mock("../../../components/Chips/Chips", () => ({
  NotificationChip: () => "NotificationChip",
}));
jest.mock("../../../components/Cards/SimpleCard", () => "SimpleCard");
jest.mock("../../../components/Cards/CardBox", () => "CardBox");
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");

const renderWithMode = (mode: "basic" | "pro") => {
  return renderWithProviders(<HomeMain />, {
    preloadedState: { mode: { mode } },
  });
};

describe("<NormalHome />", () => {
  it("handles button press", () => {
    const { getByText } = renderWithMode("basic");

    fireEvent.press(getByText("개인정보 처리방침"));
    fireEvent.press(getByText("이용약관"));
    fireEvent.press(getByText("현재 버전 0.1.0"));
  });

  it("renders with user", () => {
    renderWithProviders(<HomeMain />, {
      preloadedState: {
        mode: { mode: "basic" },
        auth: { user: admin, token: "" },
      },
    });
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
