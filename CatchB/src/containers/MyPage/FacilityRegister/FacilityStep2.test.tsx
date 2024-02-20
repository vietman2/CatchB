/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";
import * as ImagePicker from "expo-image-picker";

import FacilityStep2 from "./FacilityStep2";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    PaperProvider: Provider,
    Text: "Text",
    TextInput: {
      ...jest.requireActual("react-native-paper").TextInput,
      Icon: "Icon",
    },
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
jest.mock(
  "../../../components/Pickers/WorkTimePickers",
  () => "WorkTimePickers"
);
jest.mock("../../../components/Pickers/NumberPicker", () => "NumberPicker");

describe("<FacilityStep2 />", () => {
  it("should handle image picker: uploaded", async () => {
    jest.spyOn(ImagePicker, "launchImageLibraryAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: false,
        assets: [
          {
            assetId: "testId",
            uri: "testUri",
            width: 100,
            height: 100,
          },
        ],
      })
    );
    const { getByTestId } = renderWithProviders(
      <FacilityStep2 onFinish={() => {}} />
    );

    waitFor(() => fireEvent.press(getByTestId("imagePicker")));
  });

  it("should handle image picker: cancelled", async () => {
    jest.spyOn(ImagePicker, "launchImageLibraryAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: true,
        assets: null,
      })
    );
    const { getByTestId } = renderWithProviders(
      <FacilityStep2 onFinish={() => {}} />
    );

    waitFor(() => fireEvent.press(getByTestId("imagePicker")));
  });
});
