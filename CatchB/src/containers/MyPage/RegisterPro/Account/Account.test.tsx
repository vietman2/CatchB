/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent } from "@testing-library/react-native";

import Account from "./Account";
import { renderWithProviders } from "../../../../utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress} accessibilityLabel="버튼">
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Divider: "Divider",
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../fragments", () => ({
  Bank: "Bank",
  BankAccountPreview: "BankAccountPreview",
  BankChoice: "BankChoice",
  IconButton: "IconButton",
  IconText: "IconText",
  MainTitle: "MainTitle",
  SubTitle: "SubTitle",
}));
jest.mock("../../../../components/Terms", () => ({
  RegisterProTerms: "RegisterProTerms",
}));

describe("<Account />", () => {
  it("renders correctly and handles button press", () => {
    const { getByText } = renderWithProviders(<Account onFinish={jest.fn()} />);

    fireEvent.press(getByText("다음 (2/3)"));
  });
});
