/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render } from "@testing-library/react-native";

import CoachDetail from "./CoachDetail";

jest.mock("react-native-paper", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Chip: "Chip",
    Divider: "Divider",
    Snackbar: "Snackbar",
    Text: "Text",
    TextInput: "TextInput",
  };
});
jest.mock("expo-image-picker", () => ({
  ImagePickerAsset: "ImagePickerAsset",
}));
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../fragments", () => ({
  MainTitle: "MainTitle",
  SubTitle: "SubTitle",
}));
jest.mock("../../../../components/Pickers", () => ({
  ImagePicker: "ImagePicker",
}));
jest.mock("../../../../components/Selectors", () => ({
  RegionSelector: "RegionSelector",
  Selector: "Selector",
}));

describe("<CoachDetail />", () => {
  it("handles other text inputs", () => {
    const { getByTestId } = render(<CoachDetail onFinish={jest.fn()} />);

    fireEvent.changeText(getByTestId("curriculum"), "curriculum");
  });

  it("handles the finish button", () => {
    const onFinish = jest.fn();
    const { getByText } = render(<CoachDetail onFinish={onFinish} />);

    fireEvent.press(getByText("다음 (1/3)"));
  });
});
