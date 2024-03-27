import { fireEvent } from "@testing-library/react-native";

import CommentSimple from "./CommentSimple";
import { sampleComments } from ".data/community";
import { admin } from ".data/users";
import * as commentAPI from ".services/community/comment";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const Dialog = jest.requireActual("react-native-paper").Dialog;

  return {
    PaperProvider: Provider,
    Dialog,
    Divider: "Divider",
    Icon: "Icon",
    Portal: "Portal",
    Text: "Text",
  };
});
jest.mock(".components/Selectors", () => ({
  Selector: "Selector",
}));

describe("<CommentSimple />", () => {
  it("should render liked comment correctly", () => {
    renderWithProviders(<CommentSimple initialComment={sampleComments[0]} />);
  });

  it("should render disliked comment correctly", () => {
    renderWithProviders(<CommentSimple initialComment={sampleComments[1]} />);
  });

  it("should handle like/dislike button click", () => {
    jest.spyOn(commentAPI, "commentLike").mockResolvedValue({
      status: 200,
      data: sampleComments[0],
    });
    jest.spyOn(commentAPI, "commentDislike").mockResolvedValue({
      status: 200,
      data: sampleComments[0],
    });

    const { getByTestId } = renderWithProviders(
      <CommentSimple initialComment={sampleComments[0]} />,
      {
        preloadedState: {
          auth: {
            token: "token",
            user: admin,
          },
        },
      }
    );

    fireEvent.press(getByTestId("like"));
    fireEvent.press(getByTestId("dislike"));
  });

  it("should handle like/dislike button click fail", () => {
    jest.spyOn(commentAPI, "commentLike").mockResolvedValue({
      status: 400,
      data: {},
    });
    jest.spyOn(commentAPI, "commentDislike").mockResolvedValue({
      status: 400,
      data: {},
    });

    const { getByTestId } = renderWithProviders(
      <CommentSimple initialComment={sampleComments[0]} />,
      {
        preloadedState: {
          auth: {
            token: "token",
            user: admin,
          },
        },
      }
    );

    fireEvent.press(getByTestId("like"));
    fireEvent.press(getByTestId("dislike"));
  });

  it("should handle report button click", () => {
    const { getByTestId } = renderWithProviders(
      <CommentSimple initialComment={sampleComments[0]} />
    );

    fireEvent.press(getByTestId("report"));
    fireEvent.press(getByTestId("submit"));
  });
});
