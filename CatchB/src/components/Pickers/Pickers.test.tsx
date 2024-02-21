import axios from "axios";
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
  const assets = [
    {
      assetId: "testId",
      uri: "testUri",
      width: 100,
      height: 100,
    },
  ];

  it("should handle image picker: uploaded", async () => {
    jest.spyOn(Picker, "launchImageLibraryAsync").mockImplementation(() =>
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
    jest.spyOn(Picker, "launchImageLibraryAsync").mockImplementation(() =>
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
        uploadedImages={assets}
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
/*
describe("<AreaPicker />", () => {
  jest.spyOn(axios, "get").mockImplementation(() =>
    Promise.resolve({
      status: 200,
      data: {
        sido: [
          { code: "11", name: "서울특별시" },
          { code: "26", name: "부산광역시" },
          { code: "01", name: "세종특별자치시" },
        ],
        sigungu: [
          { code: "1100000000", name: "서울특별시 관악구" },
          { code: "1100000001", name: "서울특별시 강남구" },
          { code: "1100000002", name: "서울특별시 송파구" },
          { code: "1100000003", name: "서울특별시 구로구" },
          { code: "1100000004", name: "서울특별시 종로구" },
          { code: "1100000005", name: "서울특별시 강동구" },
          { code: "2600000000", name: "부산광역시 연제구" },
          { code: "0100000000", name: "세종특별자치시" },
        ],
        sigungu_by_sido: {
          서울특별시: [
            "관악구",
            "강남구",
            "송파구",
            "구로구",
            "종로구",
            "강동구",
          ],
          부산광역시: ["연제구"],
          세종특별자치시: ["세종특별자치시"],
        },
      },
    })
  );

  it("renders and handles onPresses correctly", async () => {
    const { getByText, getAllByText } = await waitFor(() =>
      renderWithProviders(
        <AreaPicker
          visible={true}
          onDismiss={() => {}}
          setSelectedAreas={() => {}}
        />
      )
    );

    await waitFor(() => {
      fireEvent.press(getByText("부산광역시"));
      fireEvent.press(getByText("연제구"));
      fireEvent.press(getByText("연제구"));
      fireEvent.press(getAllByText("세종특별자치시")[0]);
      fireEvent.press(getAllByText("세종특별자치시")[1]);
    });
  });

  it("handles over 5 presses correctly", async () => {
    const { getByText } = await waitFor(() =>
      renderWithProviders(
        <AreaPicker
          visible={true}
          onDismiss={() => {}}
          setSelectedAreas={() => {}}
        />
      )
    );

    await waitFor(() => {
      fireEvent.press(getByText("관악구"));
      fireEvent.press(getByText("송파구"));
      fireEvent.press(getByText("구로구"));
      fireEvent.press(getByText("강남구"));
      fireEvent.press(getByText("종로구"));
      fireEvent.press(getByText("강동구"));
    });
  });

  it("handles chip close correctly", async () => {
    const { getByText } = await waitFor(() =>
      renderWithProviders(
        <AreaPicker
          visible={true}
          onDismiss={() => {}}
          setSelectedAreas={() => {}}
        />
      )
    );

    await waitFor(() => {
      fireEvent.press(getByText("관악구"));
    });

    await waitFor(() => {
      fireEvent.press(getByText("서울특별시 관악구"));
    });
  });
});*/
