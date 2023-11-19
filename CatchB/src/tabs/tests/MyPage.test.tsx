import { render } from "@testing-library/react-native";

import MyPage from "../MyPage";

describe("MyPage", () => {
  it("renders correctly", () => {
    const { getByText } = render(<MyPage />);
    expect(getByText("마이페이지 화면")).toBeTruthy();
  });
});
