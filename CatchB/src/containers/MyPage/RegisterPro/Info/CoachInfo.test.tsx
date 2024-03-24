/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";

import CoachInfo from "./CoachInfo";
import * as CoachAPI from ".services/products/coach";
import * as RegionAPI from ".services/products/region";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    PaperProvider: Provider,
    Button: ({ onPress, children }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
    Divider: "Divider",
    Snackbar: ({ onDismiss, action }: any) => (
      <>
        <TouchableOpacity onPress={onDismiss}>
          <Text>Dismiss</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={action.onPress}>
          <Text>Action</Text>
        </TouchableOpacity>
      </>
    ),
    TextInput: "TextInput",
  };
});
jest.mock("expo-image-picker", () => ({
  ImagePickerAsset: "ImagePickerAsset",
}));
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../fragments", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  return {
    MainTitle: "MainTitle",
    SubTitle: "SubTitle",
    RegionChoices: ({ setVisible }: any) => (
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>RegionChoices</Text>
      </TouchableOpacity>
    ),
    SelectedRegions: ({ removeSelected }: any) => (
      <TouchableOpacity onPress={removeSelected}>
        <Text>SelectedRegions</Text>
      </TouchableOpacity>
    ),
  };
});
jest.mock(".components/Loading", () => ({
  LoadingComponent: "LoadingComponent",
}));
jest.mock(".components/Pickers", () => ({
  ImagePicker: "ImagePicker",
}));
jest.mock(".components/Selectors", () => ({
  Selector: "Selector",
}));

jest.spyOn(RegionAPI, "getRegionsList").mockResolvedValue({
  status: 200,
  data: {},
});

describe("<CoachInfo />", () => {
  it("handles text input and submit", async () => {
    jest.spyOn(CoachAPI, "postCoachInfo").mockResolvedValue({
      status: 201,
      data: {},
    });

    const { getByTestId, getByText } = await waitFor(() =>
      renderWithProviders(<CoachInfo onFinish={jest.fn()} />)
    );

    waitFor(() => {
      fireEvent.changeText(getByTestId("curriculum"), "curriculum");
      fireEvent.press(getByText("다음 (1/3)"));
    });
  });

  it("handles 400 response correctly", async () => {
    jest.spyOn(CoachAPI, "postCoachInfo").mockResolvedValue({
      status: 400,
      data: {},
    });

    const { getByText } = await waitFor(() =>
      renderWithProviders(<CoachInfo onFinish={jest.fn()} />)
    );

    waitFor(() => {
      fireEvent.press(getByText("다음 (1/3)"));
    });
  });

  it("handles 500 response correctly", async () => {
    jest.spyOn(CoachAPI, "postCoachInfo").mockResolvedValue({
      status: 500,
      data: {},
    });

    const { getByText } = await waitFor(() =>
      renderWithProviders(<CoachInfo onFinish={jest.fn()} />)
    );

    waitFor(() => {
      fireEvent.press(getByText("다음 (1/3)"));
    });
  });

  it("handles all actions correctly", async () => {
    jest.spyOn(RegionAPI, "getRegionsList").mockResolvedValue({
      status: 400,
      data: {},
    });
    const { getByText, getAllByText } = await waitFor(() =>
      renderWithProviders(<CoachInfo onFinish={jest.fn()} />)
    );

    waitFor(() => {
      fireEvent.press(getByText("RegionChoices"));
      fireEvent.press(getByText("Dismiss"));
      fireEvent.press(getByText("Action"));
      fireEvent.press(getAllByText("SelectedRegions")[0]);
      fireEvent.press(getByText("선택하기"));
      fireEvent.press(getByText("확인"));
    });
  });
});
