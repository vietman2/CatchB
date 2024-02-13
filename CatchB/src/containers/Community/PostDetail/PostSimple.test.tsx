import PostSimple from "./PostSimple";
import { renderWithProviders } from "../../../utils/test-utils";
import { samplePosts } from "../../../variables/mvp_dummy_data/posts";
import { waitFor } from "@testing-library/react-native";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Text: "Text",
    Chip: "Chip",
    Avatar: {
      ...jest.requireActual("react-native-paper").Avatar,
      Icon: "Avatar.Icon",
    },
    Icon: "Icon",
  };
});

describe("PostSimple", () => {
  it("renders correctly", () => {
    waitFor(() => renderWithProviders(<PostSimple post={samplePosts[0]} />));
  });

  it("renders short post body", () => {
    waitFor(() => renderWithProviders(<PostSimple post={samplePosts[1]} />));
  });

  it("renders another post", () => {
    waitFor(() => renderWithProviders(<PostSimple post={samplePosts[2]} />));
  });
});
