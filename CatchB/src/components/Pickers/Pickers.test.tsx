/* eslint-disable @typescript-eslint/no-explicit-any */
import * as IPicker from "expo-image-picker";
import * as FPicker from "expo-document-picker";
import { fireEvent, waitFor } from "@testing-library/react-native";

import { FilePicker, ImagePicker, NumberPicker, WorkTimePickers } from "./";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").Provider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    ...jest.requireActual("react-native-paper"),
    PaperProvider: Provider,
    Text: "Text",
    Icon: "Icon",
    Divider: "Divider",
    Chip: ({ children, onClose }: any) => (
      <TouchableOpacity onPress={onClose}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
  };
});
jest.mock("expo-document-picker", () => ({
  getDocumentAsync: jest.fn(),
  DocumentPickerAsset: jest.fn(),
}));
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
  ImagePickerAsset: jest.fn(),
  MediaTypeOptions: jest.fn(),
  ImagePickerSuccessResult: jest.fn(),
}));
jest.mock("../Images", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    ImagePreview: ({ removeImage }: any) => (
      <TouchableOpacity onPress={removeImage} testID="removeImage">
        <Text>ImagePreview</Text>
      </TouchableOpacity>
    ),
    ImagePlaceholder: "ImagePlaceholder",
  };
});

describe("<ImagePicker />", () => {
  const assets = [
    {
      assetId: "testId",
      uri: "testUri",
      width: 100,
      height: 100,
    },
  ];

  it("should handle image picker: uploaded", async () => {
    jest.spyOn(IPicker, "launchImageLibraryAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: false,
        assets: assets,
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
    jest.spyOn(IPicker, "launchImageLibraryAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: false,
        assets: assets,
      })
    );
    const { getByTestId } = renderWithProviders(
      <ImagePicker uploadedImages={assets} setUploadedImages={jest.fn()} />
    );

    waitFor(() => fireEvent.press(getByTestId("imagePicker")));
  });

  it("should handle image picker: cancelled", async () => {
    jest.spyOn(IPicker, "launchImageLibraryAsync").mockImplementation(() =>
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
      <ImagePicker uploadedImages={assets} setUploadedImages={jest.fn()} />
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

describe("<FilePicker />", () => {
  const mockFile = {
    uri: "testUri",
    name: "testName",
    type: "testType",
    fileExtension: "testExtension",
  };

  it("should handle file picker: pdf, cancelled", () => {
    jest.spyOn(FPicker, "getDocumentAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: true,
        assets: null,
      })
    );
    const { getByText } = renderWithProviders(
      <FilePicker setUploadedFile={jest.fn()} uploadedFile={null} type="pdf" />
    );

    fireEvent.press(getByText("파일 업로드"));
  });

  it("should handle file picker: pdf, uploaded", () => {
    jest.spyOn(FPicker, "getDocumentAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: false,
        assets: [mockFile],
      })
    );
    const { getByText } = renderWithProviders(
      <FilePicker setUploadedFile={jest.fn()} uploadedFile={null} type="pdf" />
    );

    fireEvent.press(getByText("파일 업로드"));
  });

  it("should handle file picker: pdf, already uploaded", () => {
    renderWithProviders(
      <FilePicker
        setUploadedFile={jest.fn()}
        uploadedFile={mockFile}
        type="pdf"
      />
    );
  });

  const mockImage = {
    assetId: "testId",
    uri: "testUri",
    width: 100,
    height: 100,
  };

  it("should handle file picker: image, cancelled", () => {
    jest.spyOn(IPicker, "launchImageLibraryAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: true,
        assets: null,
      })
    );
    const { getByText } = renderWithProviders(
      <FilePicker
        setUploadedFile={jest.fn()}
        uploadedFile={null}
        type="image"
      />
    );

    fireEvent.press(getByText("이미지 업로드"));
  });

  it("should handle file picker: image, uploaded", () => {
    jest.spyOn(IPicker, "launchImageLibraryAsync").mockImplementation(() =>
      Promise.resolve({
        canceled: false,
        assets: [mockImage],
      })
    );
    const { getByText } = renderWithProviders(
      <FilePicker
        setUploadedFile={jest.fn()}
        uploadedFile={null}
        type="image"
      />
    );

    fireEvent.press(getByText("이미지 업로드"));
  });

  it("should handle file picker: image, already uploaded", () => {
    renderWithProviders(
      <FilePicker
        setUploadedFile={jest.fn()}
        uploadedFile={mockImage}
        type="image"
      />
    );
  });
});

describe("<WorkTimePickers />", () => {
  const Component = () => {
    return (
      <WorkTimePickers
        weekdayStart=""
        setWeekdayStart={() => {}}
        weekdayEnd=""
        setWeekdayEnd={() => {}}
        saturdayStart=""
        setSaturdayStart={() => {}}
        saturdayEnd=""
        setSaturdayEnd={() => {}}
        sundayStart=""
        setSundayStart={() => {}}
        sundayEnd=""
        setSundayEnd={() => {}}
      />
    );
  };
  it("should render correctly", () => {
    const { getByTestId } = renderWithProviders(<Component />);
  });

  it("should correctly format time", () => {
    const { getByTestId } = renderWithProviders(<Component />);

    waitFor(() => {
      fireEvent.changeText(getByTestId("weekdayStart"), "1");
      fireEvent.changeText(getByTestId("weekdayStart"), "12345");

      fireEvent.changeText(getByTestId("weekdayEnd"), "1");
      fireEvent.changeText(getByTestId("saturdayStart"), "1");
      fireEvent.changeText(getByTestId("saturdayEnd"), "1");
      fireEvent.changeText(getByTestId("sundayStart"), "1");
      fireEvent.changeText(getByTestId("sundayEnd"), "1");
    });
  });
});
