import { render } from "@testing-library/react-native";

import CommentSimple from "./CommentSimple";
import { sampleComments } from ".data/community";

describe("<CommentSimple />", () => {
  it("should render without error", () => {
    render(<CommentSimple comment={sampleComments[0]} />);
  });
});
