import { renderWithProviders } from "../../utils/test-utils";

import Home from "../Home";

describe("Home", () => {
  it("renders correctly", () => {
    renderWithProviders(<Home />);
  });
});
