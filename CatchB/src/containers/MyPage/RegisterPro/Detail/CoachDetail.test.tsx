/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, waitFor } from "@testing-library/react-native";

import CoachDetail from "./CoachDetail";
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
    Snackbar: "Snackbar",
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
  RegionChoices: "RegionChoices",
  SelectedRegions: "SelectedRegions",
}));
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

describe("<CoachDetail />", () => {
  it("handles other text inputs", async () => {
    const { getByTestId } = await waitFor(() => renderWithProviders(<CoachDetail onFinish={jest.fn()} />));

    fireEvent.changeText(getByTestId("curriculum"), "curriculum");
  });
});
