/* eslint-disable react/display-name */
import { fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyPageContainer from "./MyPageStack";
import { renderWithProviders } from "../../utils/test-utils";
import { admin } from "../../variables/mvp_dummy_data/user";

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
}));
jest.mock("rn-tourguide", () => ({
  TourGuideZone: "TourGuideZone",
  useTourGuideController: () => ({ start: jest.fn() }),
}));
jest.mock("react-native-paper", () => {
  const Provider = jest.requireActual("react-native-paper").PaperProvider;
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  const { Dialog } = jest.requireActual("react-native-paper");

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
    Portal: "Portal",
    Dialog: Dialog,
  };
});
jest.mock("expo-linear-gradient", () => ({
  LinearGradient: "LinearGradient",
}));
jest.mock("expo-document-picker", () => ({
  getDocumentAsync: jest.fn(),
}));
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
}));
jest.mock("./Main/MyPageMain", () => {
  const { View, TouchableOpacity } = jest.requireActual("react-native");

  return () => {
    const navigation = jest
      .requireActual("@react-navigation/native")
      .useNavigation();
    return (
      <View>
        <TouchableOpacity
          testID="profile-button"
          onPress={() => navigation.navigate("Profile")}
        />
        <TouchableOpacity
          testID="profile-edit-button"
          onPress={() => navigation.navigate("EditProfile")}
        />
        <TouchableOpacity
          testID="coupon-register-button"
          onPress={() => navigation.navigate("CouponRegister")}
        />
        <TouchableOpacity
          testID="points-button"
          onPress={() => navigation.navigate("Points")}
        />
        <TouchableOpacity
          testID="register-pro-button"
          onPress={() => navigation.navigate("RegisterPro")}
        />
        <TouchableOpacity
          testID="payments-button"
          onPress={() => navigation.navigate("Payments")}
        />
        <TouchableOpacity
          testID="faq-button"
          onPress={() => navigation.navigate("FAQ")}
        />
        <TouchableOpacity
          testID="reviews-button"
          onPress={() => navigation.navigate("Reviews")}
        />
        <TouchableOpacity
          testID="password-button"
          onPress={() => navigation.navigate("PasswordChange")}
        />
      </View>
    );
  };
});
jest.mock("./Login/Login", () => "Login");
jest.mock("./SignUp/SignUp", () => "SignUp");
jest.mock("./Profile/UserProfile", () => "UserProfile");
jest.mock("./Profile/EditProfile", () => "EditProfile");
jest.mock("./Point/Points", () => "Points");
jest.mock("./Coupon/CouponList", () => "CouponList");
jest.mock("./Coupon/CouponRegister", () => "CouponRegister");
jest.mock("./RegisterPro/RegisterPro", () => "RegisterPro");
jest.mock("./Payment/Payments", () => "Payments");
jest.mock("./FAQ/FAQ", () => "FAQ");
jest.mock("./Review/Reviews", () => "Reviews");
jest.mock("./PasswordChange/PasswordChange", () => "PasswordChange");
jest.mock("../../components/Buttons", () => {
  const { TouchableOpacity } = jest.requireActual("react-native");
  return {
    BackButton: ({ onPress }: { onPress: () => void }) => {
      return <TouchableOpacity onPress={onPress} testID="back" />;
    },
  };
});
jest.mock("../../components/Logos", () => ({
  SmallLogo: "SmallLogo",
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
    const { getByTestId } = render();

    fireEvent.press(getByTestId("profile-button"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("profile-edit-button"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("coupon-register-button"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("points-button"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("register-pro-button"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("payments-button"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("faq-button"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("reviews-button"));
    fireEvent.press(getByTestId("back"));
    fireEvent.press(getByTestId("password-button"));
    fireEvent.press(getByTestId("back"));
  });
});
