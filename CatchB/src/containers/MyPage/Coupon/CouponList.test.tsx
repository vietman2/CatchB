import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CouponList from "./CouponList";
import { renderWithProviders } from "../../../utils/test-utils";
import { sampleCoupons } from ".data/users";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Text: "Text",
  };
});
jest.mock("./fragments", () => ({
  ActivityIndicator: "ActivityIndicator",
  Coupon: "Coupon",
  NoCoupon: "NoCoupon",
}));

const Stack = createStackNavigator();

const Components = () => {
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
      renderWithProviders(<Components />, {
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
      renderWithProviders(<Components />, {
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
      renderWithProviders(<Components />, {
        preloadedState: {
          auth: {
            token: "token",
            user: null,
          },
        },
      })
    );
  });

  it("handles coupon register correctly", async () => {
    const { getByText } = renderWithProviders(<Components />, {
      preloadedState: {
        auth: {
          token: "token",
          user: null,
        },
      },
    });

    waitFor(() => {
      fireEvent.press(getByText("+ 쿠폰등록"));
    });
  });
});
