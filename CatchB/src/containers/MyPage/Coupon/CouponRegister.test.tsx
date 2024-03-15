import { fireEvent, waitFor } from "@testing-library/react-native";

import CouponRegister from "./CouponRegister";
import * as CouponServices from ".services/user_management/coupon";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("expo-linear-gradient", () => {
  return {
    LinearGradient: "LinearGradient",
  };
});
jest.mock("react-native-paper", () => ({
  ...jest.requireActual("react-native-paper"),
  ActivityIndicator: "ActivityIndicator",
  Button: "Button",
  Text: "Text",
  TextInput: "TextInput",
}));

describe("<CouponRegister />", () => {
  it("handles input correctly", async () => {
    jest.spyOn(CouponServices, "registerCoupon").mockImplementation(() =>
      Promise.resolve({
        status: 202,
        data: {
          task_id: "1234",
        },
      })
    );
    jest.spyOn(CouponServices, "checkStatus").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {},
      })
    );

    const { getByTestId } = renderWithProviders(<CouponRegister />);
    const input = getByTestId("coupon-register-text-input");

    fireEvent.changeText(input, "1234");
    fireEvent.changeText(input, "--------");
    waitFor(() => {
      fireEvent.press(getByTestId("coupon-register-button"));
    });
  });

  it("handles status check error", async () => {
    jest.spyOn(CouponServices, "registerCoupon").mockImplementation(() =>
      Promise.resolve({
        status: 202,
        data: {
          task_id: "1234",
        },
      })
    );
    jest.spyOn(CouponServices, "checkStatus").mockImplementation(() =>
      Promise.resolve({
        status: 400,
        data: {},
      })
    );

    const { getByTestId } = renderWithProviders(<CouponRegister />);

    waitFor(() => {
      fireEvent.press(getByTestId("coupon-register-button"));
    });
  });

  it("doesn't handle input correctly", async () => {
    jest.spyOn(CouponServices, "registerCoupon").mockImplementation(() =>
      Promise.resolve({
        status: 400,
        data: {
          task_id: "1234",
        },
      })
    );

    const { getByTestId } = renderWithProviders(<CouponRegister />);

    waitFor(() => {
      fireEvent.press(getByTestId("coupon-register-button"));
    });
  });
});
