import PostDetail from "./PostDetail";
import { renderWithProviders } from "../../../utils/test-utils";
import { samplePosts } from "../../../variables/mvp_dummy_data/posts";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Text: "Text",
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../../../components/Chips", () => ({
  PostTagChip: "PostTagChip",
}));
jest.mock("../../../components/Profile", () => ({
  CommunityPostProfile: "CommunityPostProfile",
}));

describe("<PostDetail />", () => {
  it("renders correctly", () => {
    renderWithProviders(<PostDetail />, {
      preloadedState: {
        community: {
          selectedPost: samplePosts[0],
        },
      },
    });
  });
});
