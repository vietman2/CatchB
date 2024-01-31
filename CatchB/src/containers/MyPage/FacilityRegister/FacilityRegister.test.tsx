import { fireEvent, waitFor } from "@testing-library/react-native";

import FacilityRegister from "./FacilityRegister";
import { renderWithProviders } from "../../../utils/test-utils";
import { admin } from "../../../variables/mvp_dummy_data/user";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  const { Dialog } = jest.requireActual("react-native-paper");

  const mockButton = ({ children, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );

  return {
    PaperProvider: Provider,
    Text: "Text",
    TextInput: "TextInput",
    Portal: "Portal",
    Button: mockButton,
    Dialog,
    Chip: "Chip",
  };
});
jest.mock("@actbase/react-daum-postcode", () => {
  const { View, Text, TouchableOpacity } = jest.requireActual("react-native");

  const mockPostCode = ({ onSelected, onError }) => (
    <View>
      <Text>PostCode</Text>
      <TouchableOpacity onPress={onSelected}>
        <Text>onSelected</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onError}>
        <Text>onError</Text>
      </TouchableOpacity>
    </View>
  );

  return mockPostCode;
});
jest.mock("@actbase/react-daum-postcode/lib/types", () => ({
  OnCompleteParams: "OnCompleteParams",
}));

describe("<FacilityRegister />", () => {
  it("should handle textinput changes correctly", async () => {
    const { getByPlaceholderText } = renderWithProviders(<FacilityRegister />, {
      preloadedState: {
        auth: {
          user: admin,
          token: "token",
        },
      },
    });

    const facilityNameInput = getByPlaceholderText("시설 이름을 입력하세요");
    const contactInput = getByPlaceholderText("- 없이 숫자만 입력하세요");
    const registrationNumberInput = getByPlaceholderText(
      "사업자 등록번호를 입력하세요 (- 제외)"
    );
    const address2Input = getByPlaceholderText("상세주소를 입력하세요");

    await waitFor(() => {
      fireEvent.changeText(facilityNameInput, "시설 이름");
      fireEvent.changeText(contactInput, "01012341234");
      fireEvent.changeText(registrationNumberInput, "1234567890");
      fireEvent.changeText(address2Input, "상세 주소");
    });
  });

  it("should handle address selection correctly", async () => {
    const { getByText } = renderWithProviders(<FacilityRegister />, {
      preloadedState: {
        auth: {
          user: admin,
          token: "token",
        },
      },
    });

    await waitFor(() => {
      fireEvent.press(getByText("검색"));
      fireEvent.press(getByText("onSelected"));
    });

    await waitFor(() => {
      fireEvent.press(getByText("검색"));
      fireEvent.press(getByText("onError"));
      fireEvent.press(getByText("취소"));
    });
  });
});
