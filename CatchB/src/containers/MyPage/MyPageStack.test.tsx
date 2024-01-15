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
  const { TouchableOpacity, Text } = jest.requireActual("react-native");

  const mockButton = ({ children, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );

  return {
    PaperProvider: Provider,
    Divider: "Divider",
    Text: "Text",
    TextInput: "TextInput",
    TouchableRipple: "TouchableRipple",
    Icon: "Icon",
    IconButton: "IconButton",
    Button: mockButton,
    Snackbar: "Snackbar",
    ActivityIndicator: "ActivityIndicator",
  };
});
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: "LinearGradient",
}));
jest.mock("expo-document-picker", () => ({
  getDocumentAsync: jest.fn(),
}));
jest.mock("./Login/Login", () => "Login");
jest.mock("./SignUp/SignUp", () => "SignUp");
jest.mock("../../components/Buttons/FAB", () => "FABGroup");
jest.mock("../../components/Divider/VerticalDivider", () => "VerticalDivider");
jest.mock("../../components/Dialogs/LoginDialog", () => "LoginDialog");
jest.mock("../../components/Avatar/AvatarImage", () => "AvatarImage");
jest.mock("../../components/Logos/TopBar", () => ({
  leftTitle: () => "leftTitle",
}));
jest.mock("../../components/Avatar/AvatarHorizontal", () => {
  const { View } = jest.requireActual("react-native");
  return () => <View testID="badge">ProfileBadge</View>;
});
jest.mock("../../components/Checkboxes/SingleCheck", () => "SingleCheck");
jest.mock("../../components/Checkboxes/MultiCheck", () => "MultiCheck");

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
  it("navigates to <Profile /> then <EditProfile /> then back", () => {
    const { getByTestId, getByText } = render();

    waitFor(() => fireEvent.press(getByTestId("badge")));
    waitFor(() => fireEvent.press(getByText("닉네임")));
    waitFor(() => fireEvent.press(getByTestId("back")));
    waitFor(() => fireEvent.press(getByTestId("back")));
  });

  it("navigates to <Coupons /> and <Points />", () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 400,
        data: [],
      })
    );
    const { getByTestId, getByText } = render();

    waitFor(() => fireEvent.press(getByText("쿠폰함")));
    waitFor(() => fireEvent.press(getByText("+ 쿠폰등록")));
    waitFor(() => fireEvent.press(getByTestId("back")));
    waitFor(() => fireEvent.press(getByTestId("back")));

    waitFor(() => fireEvent.press(getByText("포인트")));
    waitFor(() => fireEvent.press(getByTestId("back")));
  });

  it("navigates to <Coupon /> when user is logged in", () => {
    jest.spyOn(axios, "get").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: sampleCoupons,
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
            coupons: sampleCoupons,
            selectedCoupon: null,
          },
        },
      }
    );
    waitFor(() => {
      fireEvent.press(getByText("쿠폰함"));
    });
  });

  it("navigates to <CoachRegister /> and <FacilityRegister />", () => {
    const { getByTestId, getByText } = render();

    waitFor(() => fireEvent.press(getByText("코치 등록하기")));
    waitFor(() => fireEvent.press(getByTestId("back")));

    waitFor(() => fireEvent.press(getByText("시설 등록하기")));
    waitFor(() => fireEvent.press(getByTestId("back")));
  });

  it("navigates to <Payments />, <FAQ /> and <Reviews />", () => {
    const { getByTestId, getByText } = render();

    waitFor(() => fireEvent.press(getByText("결제수단 관리")));
    waitFor(() => fireEvent.press(getByTestId("back")));
    waitFor(() => fireEvent.press(getByText("자주 묻는 질문")));
    waitFor(() => fireEvent.press(getByTestId("back")));
    waitFor(() => fireEvent.press(getByText("리뷰")));
    waitFor(() => fireEvent.press(getByTestId("back")));
  });
});
