import { render } from "@testing-library/react-native";

import { leftTitle } from "./TopBar";

describe("TopBar", () => {
  describe("leftTitle", () => {
    it("renders correctly", () => {
      const { getByText } = render(leftTitle());
      expect(getByText("Catch B")).toBeTruthy();
    });
  });
});
