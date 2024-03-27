import { fireEvent } from "@testing-library/react-native";

import Tags from "./Tags";
import { sampleTags, tag1 } from ".data/community";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    ...jest.requireActual("react-native-paper"),
    PaperProvider: Provider,
    Text: "Text",
  };
});
jest.mock("../fragments", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    Tag: ({ tag }) => (
      <TouchableOpacity>
        <Text>{tag.name}</Text>
      </TouchableOpacity>
    ),
  };
});

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
