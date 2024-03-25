import { render } from "@testing-library/react-native";

import PostHeader from "./PostHeader";
import { samplePosts } from ".data/community";

describe("<PostHeader />", () => {
  it("renders correctly", () => {
    render(<PostHeader post={samplePosts[0]} />);
  });

  it("renders with fake timer1: 2021-01-01 01:01", () => {
    render(
      <PostHeader
        post={{ ...samplePosts[0], created_at: "2021-01-01 01:01" }}
      />
    );
  });

  it("renders with fake timer2: 2021-11-11 11:11", () => {
    render(
      <PostHeader
        post={{ ...samplePosts[0], created_at: "2021-11-11 11:11" }}
      />
    );
  });
});
