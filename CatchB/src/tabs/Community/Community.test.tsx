import { render } from "@testing-library/react-native";

import Community from "./Community";

describe("Community", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Community />);
  });
});
