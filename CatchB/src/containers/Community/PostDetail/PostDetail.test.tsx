import PostDetail from "./PostDetail";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Text: "Text",
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../../Base/ErrorPage", () => "ErrorPage");
jest.mock("../../../components/Loading", () => ({
  LoadingPage: "LoadingPage",
}));
jest.mock("../../../components/Profile", () => ({
  CommunityPostProfile: "CommunityPostProfile",
}));

describe("<PostDetail />", () => {
  it("renders correctly", () => {
    renderWithProviders(<PostDetail />, {
      preloadedState: {
        community: {
          selectedPostId: null,
        },
      },
    });
  });
});
