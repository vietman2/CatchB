import { render } from "@testing-library/react-native";

import Community from "../Community";

describe("Community", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Community />);
    expect(getByText("캐치비")).toBeTruthy();
    expect(getByText("Catch B")).toBeTruthy();
  });
});
