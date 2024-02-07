/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import * as ImagePicker from "expo-image-picker";

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
    MediaTypeOptions: {
      Images: "Images",
    },
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
    const { getByTestId, getByText } = render(
      <FacilityStep2 onFinish={() => {}} />
    );

    fireEvent.changeText(getByTestId("weekdayStart"), "09:30");
    fireEvent.changeText(getByTestId("weekdayEnd"), "21:30");
    fireEvent.changeText(getByTestId("saturdayStart"), "09:30");
    fireEvent.changeText(getByTestId("saturdayEnd"), "21:30");
    fireEvent.changeText(getByTestId("sundayStart"), "09:30");
    fireEvent.changeText(getByTestId("sundayEnd"), "21:30");

    fireEvent.changeText(
      getByTestId("introduction"),
      "This is a test introduction"
    );

    fireEvent.press(getByText("완료 (1/3)"));
  });

  it("should handle image picker: uploaded", async () => {
    jest.spyOn(ImagePicker, "launchImageLibraryAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: false,
        assets: [
          {
            uri: "testUri",
            width: 100,
            height: 100,
          },
        ],
      })
    );
    const { getByTestId } = render(<FacilityStep2 onFinish={() => {}} />);

    waitFor(() => fireEvent.press(getByTestId("imagePicker")));
  });

  it("should handle image picker: cancelled", async () => {
    jest.spyOn(ImagePicker, "launchImageLibraryAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: true,
        assets: null,
      })
    );
    const { getByTestId } = render(<FacilityStep2 onFinish={() => {}} />);

    waitFor(() => fireEvent.press(getByTestId("imagePicker")));
  });

  it("should handle time format correctly", async () => {
    const { getByTestId } = render(<FacilityStep2 onFinish={() => {}} />);

    const component = getByTestId("weekdayStart");

    fireEvent.changeText(component, "1");
    fireEvent.changeText(component, "123");
    fireEvent.changeText(component, "123456");
  });
});
