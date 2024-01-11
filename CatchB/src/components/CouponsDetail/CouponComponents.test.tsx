import { render } from "@testing-library/react-native";

import AvailableCoupon from "./AvailableCoupon";
import MyCoupon from "./MyCoupon";
import NoCoupon from "./NoCoupon";
import { sampleCoupons } from "../../variables/mvp_dummy_data/coupons";

jest.mock("expo-linear-gradient", () => {
  return {
    LinearGradient: "LinearGradient",
  };
});
jest.mock("react-native-paper", () => {
  return {
    Text: "Text",
    Icon: "Icon",
  };
});

describe("<AvailableCoupon />", () => {
  it("renders correctly", () => {
    render(<AvailableCoupon />);
  });
});

describe("<MyCoupon />", () => {
  it("renders correctly", () => {
    render(<MyCoupon coupon={sampleCoupons[0]} />);
  });
});

describe("<NoCoupon />", () => {
  it("renders correctly", () => {
    render(<NoCoupon />);
  });
});
