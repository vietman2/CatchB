import { fireEvent, waitFor } from "@testing-library/react-native";

import PostDetail from "./PostDetail";
import { samplePosts } from ".data/community";
import { admin } from ".data/users";
import * as PostAPI from ".services/community/post";
import * as CommentAPI from ".services/community/comment";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const ActualTextInput = jest.requireActual("react-native-paper").TextInput;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  const TextInput = (props: any) => {
    return <ActualTextInput {...props}>{props.right}</ActualTextInput>;
  };
  const TextInputIcon = ({ icon, onPress }: any) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{icon}</Text>
    </TouchableOpacity>
  );
  TextInput.Icon = TextInputIcon;

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Text: "Text",
    TextInput: TextInput,
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");
jest.mock("../fragments", () => ({
  CommentSimple: "CommentSimple",
  PostHeader: "PostHeader",
}));
jest.mock(".components/Error", () => ({
  ErrorPage: "ErrorPage",
}));
jest.mock(".components/Loading", () => ({
  LoadingPage: "LoadingPage",
}));

jest.spyOn(PostAPI, "getPostDetail").mockResolvedValue({
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

  it("handles comment correctly", async () => {
    jest.spyOn(CommentAPI, "createComment").mockResolvedValue({
      status: 201,
      data: null,
    });

    const { getByTestId, getByText } = await waitFor(() =>
      renderWithProviders(<PostDetail />, {
        preloadedState: {
          auth: {
            user: admin,
            token: "token"
          },
          community: {
            selectedPostId: 0,
          },
        },
      })
    );

    await waitFor(() => {
      fireEvent.changeText(getByTestId("comment-input"), "test comment");
    });

    await waitFor(() => {
      fireEvent.press(getByText("send"));
    });
  });

  it("handles error correctly", () => {
    jest.spyOn(PostAPI, "getPostDetail").mockResolvedValue({
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
