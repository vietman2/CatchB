import { fireEvent } from "@testing-library/react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CouponList from "./CouponList";
import CouponRegister from "./CouponRegister";
import { renderWithProviders } from "../../../utils/test-utils";
import { sampleCoupons } from "../../../variables/mvp_dummy_data/coupons";

jest.mock("expo-linear-gradient", () => "LinearGradient");

const Stack = createStackNavigator();

const CouponListComponents = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CouponList" component={CouponList} />
        <Stack.Screen name="CouponRegister" component={CouponList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const CouponRegisterComponents = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CouponRegister" component={CouponRegister} />
        <Stack.Screen name="CouponList" component={CouponRegister} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe("<CouponList />", () => {
  it("renders correctly", () => {
    renderWithProviders(CouponListComponents());
  });

  it("renders correctly with coupons", () => {
    renderWithProviders(CouponListComponents(), {
      preloadedState: {
        coupon: {
          coupons: sampleCoupons,
          selectedCoupon: null,
        },
      },
    });
  });
});

describe("<CouponRegister />", () => {
  it("renders correctly", () => {
    renderWithProviders(CouponRegisterComponents());
  });

  it("handles input correctly", () => {
  jest.mock("react-native-paper", () => {
    return {
      PaperProvider: "PaperProvider",
      Text: "Text",
      TextInput: "TextInput",
      Button: "Button",
      TouchableRipple: "TouchableRipple",
    };
  });

    const { getByTestId } = renderWithProviders(<CouponRegister />);
    const input = getByTestId("coupon-register-text-input");

    fireEvent.changeText(input, "1234");
  });
});
