import { fireEvent, render } from "@testing-library/react-native";

import FacilityStep2 from "./FacilityStep2";

jest.mock("react-native-paper", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    Text: "Text",
    TextInput: "TextInput",
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
    launchImageLibraryAsync: jest.fn(),
  };
});
jest.mock("../../../components/Checkboxes/MultiCheck", () => "MultiCheck");
jest.mock("../../../components/Images/ImagePreview", () => "ImagePreview");
jest.mock(
  "../../../components/Images/ImagePlaceholder",
  () => "ImagePlaceholder"
);

describe("<FacilityStep2 />", () => {
  it("should handle <FacilityStep2 /> correctly", async () => {
    const { getByTestId, getByText } = render(<FacilityStep2 onFinish={() => {}} />);

    fireEvent.changeText(getByTestId("weekdayStart"), "09:30");
    fireEvent.changeText(getByTestId("weekdayEnd"), "21:30");
    fireEvent.changeText(getByTestId("saturdayStart"), "09:30");
    fireEvent.changeText(getByTestId("saturdayEnd"), "21:30");
    fireEvent.changeText(getByTestId("sundayStart"), "09:30");
    fireEvent.changeText(getByTestId("sundayEnd"), "21:30");

    fireEvent.changeText(getByTestId("introduction"), "This is a test introduction");

    fireEvent.press(getByText("완료 (1/3)"));
  });
});
