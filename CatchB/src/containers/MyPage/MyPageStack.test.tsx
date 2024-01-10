import axios from "axios";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyPageContainer from "./MyPageStack";
import { renderWithProviders } from "../../utils/test-utils";
import { admin, exampleUser } from "../../variables/mvp_dummy_data/user";
import { sampleCoupons } from "../../variables/mvp_dummy_data/coupons";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Text: "Text",
    TextInput: "TextInput",
    TouchableRipple: "TouchableRipple",
    Icon: "Icon",
    IconButton: "IconButton",
    Button: "Button",
    Snackbar: "Snackbar",
    ActivityIndicator: "ActivityIndicator",
  };
});
jest.mock("./Login/Login", () => "Login");
jest.mock("./SignUp/SignUp", () => "SignUp");
jest.mock("../../components/Buttons/FAB", () => "FABGroup");
jest.mock("../../components/Buttons/TextButton", () => "TextButton");
jest.mock("../../components/Divider/VerticalDivider", () => "VerticalDivider");
jest.mock("../../components/Avatar/AvatarImage", () => "AvatarImage");
jest.mock("../../components/Buttons/IconButton", () => "IconButton");
jest.mock("../../components/Logos/TopBar", () => ({
  leftTitle: () => "leftTitle",
  rightTitle: () => "rightTitle",
}));
jest.mock("../../components/Avatar/AvatarHorizontal", () => {
  const { View } = jest.requireActual("react-native");
  return () => <View testID="badge">ProfileBadge</View>;
});
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: "LinearGradient",
}));

const Tab = createBottomTabNavigator();

const render = () => {
  return renderWithProviders(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="MyPage" component={MyPageContainer} />
      </Tab.Navigator>
    </NavigationContainer>,
    {
      preloadedState: {
        auth: {
          user: admin,
          token: "token",
        },
      },
    }
  );
};

describe("<MyPageStack />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="MyPage" component={MyPageContainer} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  });

  it("navigates to <Profile /> then back", () => {
    const { getByTestId, getByText } = render();

    waitFor(() => fireEvent.press(getByTestId("badge")));
    expect(getByText("닉네임")).toBeTruthy();

    waitFor(() => fireEvent.press(getByTestId("back")));
  });

  it("navigates to <Profile /> then <EditProfile /> then back", () => {
    const { getByTestId, getByText } = render();

    waitFor(() => fireEvent.press(getByTestId("badge")));
    waitFor(() => fireEvent.press(getByText("닉네임")));
    waitFor(() => fireEvent.press(getByTestId("back")));
  });

  it("navigates to <Coupons /> then back", () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: {
          sampleCoupons,
        },
      })
    );
    const { getByTestId, getByText } = render();

    waitFor(() => fireEvent.press(getByText("쿠폰함")));
    waitFor(() => fireEvent.press(getByText("+ 쿠폰등록")));
    waitFor(() => fireEvent.press(getByTestId("back")));
    waitFor(() => fireEvent.press(getByTestId("back")));
  });

  it("navigates to Coupon screen when user is logged in", () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 400,
        data: [],
      })
    );
    const { getByText } = renderWithProviders(
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="MyPage" component={MyPageContainer} />
        </Tab.Navigator>
      </NavigationContainer>,
      {
        preloadedState: {
          auth: {
            user: exampleUser,
            token: "token",
          },
          coupon: {
            coupons: [],
            selectedCoupon: null,
          },
        },
      }
    );
    waitFor(() => {
      fireEvent.press(getByText("쿠폰함"));
    });
  });

  it("navigates to <Points /> then back", () => {
    const { getByTestId, getByText } = render();

    waitFor(() => fireEvent.press(getByText("포인트")));
    waitFor(() => fireEvent.press(getByTestId("back")));
  });
});
