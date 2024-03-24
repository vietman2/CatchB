/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";

import Account from "./Account";
import * as PaymentsAPI from ".services/payments/account";
import { renderWithProviders } from ".utils/test-utils";
import { sampleBanks } from ".constants/test_data/payments";

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
jest.mock("../fragments", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    Bank: "Bank",
    BankAccountPreview: "BankAccountPreview",
    BankChoice: "BankChoice",
    IconButton: ({ onPress }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>IconButton</Text>
      </TouchableOpacity>
    ),
    IconText: "IconText",
    MainTitle: "MainTitle",
    SubTitle: "SubTitle",
  };
});
jest.mock(".components/Error", () => ({
  ErrorPage: "ErrorPage",
}));
jest.mock(".components/Loading", () => ({
  LoadingPage: "LoadingPage",
}));
jest.mock(".components/Terms", () => ({
  RegisterProTerms: "RegisterProTerms",
}));

describe("<Account />", () => {
  it("renders error page correctly", async () => {
    jest.spyOn(PaymentsAPI, "getBankList").mockResolvedValue({
      status: 400,
      data: {
        message: "error",
      },
    });
    waitFor(() => renderWithProviders(<Account onFinish={jest.fn()} />));
  });

  it("renders correctly and handles button press", async () => {
    jest.spyOn(PaymentsAPI, "getBankList").mockResolvedValue({
      status: 200,
      data: sampleBanks,
    });
    const { getByText, getByTestId } = await waitFor(() =>
      renderWithProviders(<Account onFinish={jest.fn()} />)
    );

    fireEvent.press(getByText("IconButton"));
    fireEvent.press(getByTestId("bank"));
    fireEvent.press(getByText("취소"));
    fireEvent.press(getByText("다음 (2/3)"));
  });
});
