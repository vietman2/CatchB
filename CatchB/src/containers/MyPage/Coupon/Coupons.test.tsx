import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CouponList from "./CouponList";
import CouponRegister from "./CouponRegister";
import * as CouponServices from "../../../services/user_management/coupon";
import { renderWithProviders } from "../../../utils/test-utils";
import { sampleCoupons } from "../../../variables/mvp_dummy_data/coupons";

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
  Icon: "Icon",
}));

const Stack = createStackNavigator();

const CouponListComponents = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CouponList">
        <Stack.Screen name="CouponList" component={CouponList} />
        <Stack.Screen name="CouponRegister" component={CouponList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<CouponList />", () => {
  it("loads coupons correctly", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: sampleCoupons,
      })
    );

    await waitFor(() =>
      renderWithProviders(CouponListComponents(), {
        preloadedState: {
          auth: {
            token: "token",
            user: null,
          },
        },
      })
    );
  });

  it("doesn't load coupons correctly", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 400,
      })
    );

    await waitFor(() =>
      renderWithProviders(CouponListComponents(), {
        preloadedState: {
          auth: {
            token: "token",
            user: null,
          },
        },
      })
    );
  });

  it("loads no coupons correctly", async () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: [],
      })
    );

    await waitFor(() =>
      renderWithProviders(CouponListComponents(), {
        preloadedState: {
          auth: {
            token: "token",
            user: null,
          },
        },
      })
    );
  });
});

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

    const { getByTestId, getByText } = renderWithProviders(<CouponRegister />);
    const input = getByTestId("coupon-register-text-input");
    const button = getByText("쿠폰 등록");

    fireEvent.changeText(input, "1234");
    fireEvent.changeText(input, "--------");
    waitFor(() => {
      fireEvent.press(button);
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

    const { getByText } = renderWithProviders(<CouponRegister />);

    waitFor(() => {
      fireEvent.press(getByText("쿠폰 등록"));
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

    const { getByText } = renderWithProviders(<CouponRegister />);

    waitFor(() => {
      fireEvent.press(getByText("쿠폰 등록"));
    });
  });
});
