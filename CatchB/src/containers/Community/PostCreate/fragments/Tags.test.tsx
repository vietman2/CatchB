import { fireEvent } from "@testing-library/react-native";
import { renderWithProviders } from "../../../../utils/test-utils";

import Tags, { Tag } from "./Tags";
import { sampleTags, tag1 } from "../../../../variables/mvp_dummy_data/tags";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    ...jest.requireActual("react-native-paper"),
    PaperProvider: Provider,
    Text: "Text",
  };
});
jest.mock("react-native-svg", () => ({
  SvgCssUri: "SvgCssUri",
}));

describe("<Tags />", () => {
  const tagChoices = {
    selectedForum: sampleTags,
  };
  const selectedTags1 = [tag1];
  const selectedTags2 = [
    tag1,
    tagChoices.selectedForum[1],
    tagChoices.selectedForum[2],
  ];

  it("should handle presses", () => {
    const { getByText } = renderWithProviders(
      <Tags
        selectedForum="selectedForum"
        selectedTags={selectedTags1}
        setSelectedTags={jest.fn()}
        setSnackbarText={jest.fn()}
        setVisible={jest.fn()}
        tagChoices={tagChoices}
      />
    );

    fireEvent.press(getByText("tag1"));
    fireEvent.press(getByText("tag2"));
  });

  it("should handle tag select over 3", () => {
    const setSnackbarText = jest.fn();
    const setVisible = jest.fn();
    const { getByText } = renderWithProviders(
      <Tags
        selectedForum="selectedForum"
        selectedTags={selectedTags2}
        setSelectedTags={jest.fn()}
        setSnackbarText={setSnackbarText}
        setVisible={setVisible}
        tagChoices={tagChoices}
      />
    );

    fireEvent.press(getByText("tag4"));
  });
});

describe("<Tag />", () => {
  it("should render blank", () => {
    renderWithProviders(<Tag blank />);
  });
});
