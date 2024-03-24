import { render } from "@testing-library/react-native";

import { Coupon, NoCoupon } from "./";
import { sampleCoupons } from ".data/users";

jest.mock("react-native-paper", () => ({
  Icon: "Icon",
  Text: "Text",
}));
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: "LinearGradient",
}));

describe("<Coupon />", () => {
  it("renders new coupon correctly", () => {
    render(<Coupon />);
  });

  it("renders my coupon correctly", () => {
    render(<Coupon coupon={sampleCoupons[0]} />);
  });
});

describe("<NoCoupon />", () => {
  it("renders correctly", () => {
    render(<NoCoupon />);
  });
});
