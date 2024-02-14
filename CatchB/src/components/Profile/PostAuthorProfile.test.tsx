import { render } from "@testing-library/react-native";

import PostAuthorProfile from "./PostAuthorProfile";
import { samplePosts } from "../../variables/mvp_dummy_data/posts";

jest.mock("react-native-paper", () => {
  return {
    Avatar: {
      ...jest.requireActual("react-native-paper").Avatar,
      Icon: "Icon",
    },
    Text: "Text",
  };
});

describe("PostAuthorProfile", () => {
  it("renders correctly: post 1", () => {
    render(<PostAuthorProfile post={samplePosts[0]} />);
  });

  it("renders correctly: post 2", () => {
    render(<PostAuthorProfile post={samplePosts[1]} />);
  });
});
