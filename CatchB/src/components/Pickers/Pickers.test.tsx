import * as Picker from "expo-image-picker";
import { fireEvent, waitFor } from "@testing-library/react-native";

import ImagePicker from "./ImagePicker";
import NumberPicker from "./NumberPicker";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;

  return {
    PaperProvider: Provider,
    Text: "Text",
    Icon: "Icon",
  };
});
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
  ImagePickerAsset: jest.fn(),
  MediaTypeOptions: jest.fn(),
  ImagePickerSuccessResult: jest.fn(),
}));

describe("<ImagePicker />", () => {
  it("should handle image picker: empty", async () => {
    jest.spyOn(Picker, "launchImageLibraryAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: false,
        assets: [],
      })
    );
    const { getByTestId } = renderWithProviders(
      <ImagePicker uploadedImages={[]} setUploadedImages={jest.fn()} />
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("imagePicker"));
    });
  });

  it("should handle image picker: uploaded", async () => {
    jest.spyOn(Picker, "launchImageLibraryAsync").mockImplementation(() =>
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
      <ImagePicker uploadedImages={[]} setUploadedImages={jest.fn()} />
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("imagePicker"));
    });
  });

  it("should handle image picker: duplicated", async () => {
    jest.spyOn(Picker, "launchImageLibraryAsync").mockImplementation(() =>
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
      <ImagePicker
        uploadedImages={[
          {
            assetId: "testId",
            uri: "testUri",
            width: 100,
            height: 100,
          },
        ]}
        setUploadedImages={jest.fn()}
      />
    );

    waitFor(() => fireEvent.press(getByTestId("imagePicker")));
  });

  it("should handle image picker: cancelled", async () => {
    jest.spyOn(Picker, "launchImageLibraryAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: true,
        assets: null,
      })
    );
    const { getByTestId } = renderWithProviders(
      <ImagePicker uploadedImages={[]} setUploadedImages={jest.fn()} />
    );

    waitFor(() => fireEvent.press(getByTestId("imagePicker")));
  });

  it("should handle image removal", () => {
    const { getByTestId } = renderWithProviders(
      <ImagePicker
        uploadedImages={[
          {
            assetId: "testId",
            uri: "testUri",
            width: 100,
            height: 100,
          },
        ]}
        setUploadedImages={jest.fn()}
      />
    );

    fireEvent.press(getByTestId("removeImage"));
  });
});

describe("<NumberPicker />", () => {
  it("should handle number picker", () => {
    const { getByText } = renderWithProviders(
      <NumberPicker label="" value={1} onChange={jest.fn()} />
    );

    fireEvent.press(getByText("1"));
    fireEvent.press(getByText("2"));
  });
});
