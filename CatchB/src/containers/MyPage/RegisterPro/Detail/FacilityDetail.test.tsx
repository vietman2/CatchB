/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";

import FacilityDetail from "./FacilityDetail";
import { renderWithProviders } from "../../../../utils/test-utils";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const ActualTextInput = jest.requireActual("react-native-paper").TextInput;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  const TextInput = (props: any) => {
    return <ActualTextInput {...props}>{props.right}</ActualTextInput>;
  };
  const TextInputIcon = ({ onPress }: any) => (
    <TouchableOpacity onPress={onPress}>
      <Text>Icon</Text>
    </TouchableOpacity>
  );
  TextInput.Icon = TextInputIcon;

  return {
    PaperProvider: Provider,
    TextInput,
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Divider: "Divider",
  };
});
jest.mock("expo-image-picker", () => {
  return {
    ImagePickerAsset: "ImagePickerAsset",
  };
});
jest.mock("../fragments", () => ({
  MainTitle: "MainTitle",
  SubTitle: "SubTitle",
}));
jest.mock("../../../../components/Selectors", () => ({
  Selector: "Selector",
}));
jest.mock("../../../../components/Pickers", () => ({
  ImagePicker: "ImagePicker",
  NumberPicker: "NumberPicker",
  WorkTimePickers: "WorkTimePickers",
}));

describe("<FacilityDetail />", () => {
  it("should handle introduction input", async () => {
    const { getByTestId } = renderWithProviders(
      <FacilityDetail onFinish={() => {}} />
    );

    const textinput = getByTestId("introduction");
    waitFor(() => fireEvent.changeText(textinput, "test"));
  });

  it("should handle custom equipment", async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <FacilityDetail onFinish={() => {}} />
    );

    const textinput = getByTestId("additionalEquipment");
    const button = getByText("Icon");

    waitFor(() => {
      fireEvent.press(button);
      fireEvent.changeText(textinput, "test");
      fireEvent.press(button);
      fireEvent.changeText(textinput, "test");
      fireEvent.press(button);
    });
  });

  it("should handle next: failure", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 400,
        data: { message: "test" },
      })
    );
    const { getByText } = renderWithProviders(
      <FacilityDetail onFinish={() => {}} />
    );

    const button = getByText("완료 (1/3)");
    waitFor(() => fireEvent.press(button));
  });

  it("should handle next: server error", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 500,
      })
    );
    const { getByText } = renderWithProviders(
      <FacilityDetail onFinish={() => {}} />
    );

    const button = getByText("완료 (1/3)");
    waitFor(() => fireEvent.press(button));
  });

  it("should handle next: success", async () => {
    jest.spyOn(axios, "post").mockImplementation(() =>
      Promise.resolve({
        status: 201,
      })
    );
    const { getByText } = renderWithProviders(
      <FacilityDetail onFinish={() => {}} />
    );

    const button = getByText("완료 (1/3)");
    waitFor(() => fireEvent.press(button));
  });
});
