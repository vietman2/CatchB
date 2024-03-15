import { waitFor } from "@testing-library/react-native";

import PostSimple from "./PostSimple";
import { sampleSimplePosts } from ".data/community";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Avatar: {
      ...jest.requireActual("react-native-paper").Avatar,
      Icon: "Avatar.Icon",
    },
    Icon: "Icon",
    Text: "Text",
  };
});

describe("<PostSimple />", () => {
  it("renders short post correctly", () => {
    waitFor(() =>
      renderWithProviders(<PostSimple post={sampleSimplePosts[0]} />)
    );
  });

  it("renders long post correctly", () => {
    waitFor(() =>
      renderWithProviders(<PostSimple post={sampleSimplePosts[1]} />)
    );
  });

  it("renders post created today correctly", () => {
    waitFor(() =>
      renderWithProviders(<PostSimple post={sampleSimplePosts[2]} />)
    );
  });
});
