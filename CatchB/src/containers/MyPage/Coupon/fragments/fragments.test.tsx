import { render } from "@testing-library/react-native";

import { ActivityIndicator, Coupon, NoCoupon } from "./";
import { sampleCoupons } from ".data/users";

jest.mock("react-native-paper", () => ({
  ActivityIndicator: "ActivityIndicator",
  Icon: "Icon",
  Text: "Text",
}));
jest.mock("expo-linear-gradient", () => {
  return {
    LinearGradient: "LinearGradient",
  };
});

describe("<ActivityIndicator />", () => {
  it("renders correctly", () => {
    render(<ActivityIndicator />);
  });
});

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
