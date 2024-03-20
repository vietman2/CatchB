import { waitFor } from "@testing-library/react-native";

import PostDetail from "./PostDetail";
import { samplePosts } from ".data/community";
import * as APIServer from ".services/community/post";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Text: "Text",
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock(".components/Error", () => ({
  ErrorPage: "ErrorPage",
}));
jest.mock(".components/Loading", () => ({
  LoadingPage: "LoadingPage",
}));
jest.mock(".components/Profile", () => ({
  CommunityProfile: "CommunityProfile",
}));

jest.spyOn(APIServer, "getPostDetail").mockResolvedValue({
  status: 200,
  data: samplePosts[0],
});

describe("<PostDetail />", () => {
  it("renders and gets response correctly", () => {
    waitFor(() =>
      renderWithProviders(<PostDetail />, {
        preloadedState: {
          community: {
            selectedPostId: 0,
          },
        },
      })
    );
  });

  it("handles error correctly", () => {
    jest.spyOn(APIServer, "getPostDetail").mockResolvedValue({
      status: 500,
      data: null,
    });

    waitFor(() =>
      renderWithProviders(<PostDetail />, {
        preloadedState: {
          community: {
            selectedPostId: 0,
          },
        },
      })
    );
  });
});
