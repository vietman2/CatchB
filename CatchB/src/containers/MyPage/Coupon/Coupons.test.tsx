import Coupons from "./Coupons";
import { renderWithProviders } from "../../../utils/test-utils";

describe("<Coupons />", () => {
  it("renders correctly", () => {
    renderWithProviders(<Coupons />);
  });
});

