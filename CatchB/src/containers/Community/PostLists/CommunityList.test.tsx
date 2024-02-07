/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render } from "@testing-library/react-native";

import CommunityList from "./CommunityList";

jest.mock("react-native-paper", () => {
  return {
    ...jest.requireActual("react-native-paper"),
    Chip: "Chip",
    Divider: "Divider",
    Icon: "Icon",
    Text: "Text",
    TextInput: {
      ...jest.requireActual("react-native-paper").TextInput,
      Icon: "Icon",
    },
  };
});
jest.mock("@gorhom/bottom-sheet", () => {
  const { View } = jest.requireActual("react-native");
  return {
    __esModule: true,
    default: "BottomSheet",
    BottomSheetBackdrop: ({ children }: any) => <View>{children}</View>,
    BottomSheetBackdropProps: "BottomSheetBackdropProps",
  };
});
jest.mock("./PostSimple", () => "PostSimple");

describe("CommunityList", () => {
  it("renders correctly and handles presses", () => {
    const { getAllByTestId } = render(
      <CommunityList hideFAB={() => {}} showFAB={() => {}} mode="야구톡" />
    );

    fireEvent.press(getAllByTestId("sortChoice")[0]);
  });

  it("renders recruit mode correctly", () => {
    const { getAllByTestId } = render(
      <CommunityList hideFAB={() => {}} showFAB={() => {}} mode="모집" />
    );

    fireEvent.press(getAllByTestId("sortChoice")[0]);
  });
});
