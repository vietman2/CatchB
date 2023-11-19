import { render } from "@testing-library/react-native";

import MyPage from "../MyPage";

describe("MyPage", () => {
  it("renders correctly", () => {
    const { getByText } = render(<MyPage />);
    expect(getByText("Catch B")).toBeTruthy();
  });
});
