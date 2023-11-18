import { render, fireEvent } from "@testing-library/react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParamList } from "../../variables/navigation";
import Login from "../Login";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

type Props = NativeStackScreenProps<HomeStackParamList, "Login">;

const mockProps: Props = {
  navigation: {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    reset: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    canGoBack: jest.fn(),
    getId: jest.fn(),
    getState: jest.fn(),
    getParent: jest.fn(),
    setOptions: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    replace: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
  },
  route: {
    key: "",
    name: "Login",
    params: undefined,
  },
};

describe("[Login] screen rendering test", () => {
  it("should render correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <Login navigation={mockProps.navigation} route={mockProps.route} />
    );

    expect(getByText("Login")).toBeTruthy();
    expect(getByPlaceholderText("아이디")).toBeTruthy();
    expect(getByPlaceholderText("비밀번호")).toBeTruthy();
  });

  it("should render error text correctly", () => {
    const { getByText } = render(
      <Login navigation={mockProps.navigation} route={mockProps.route} />
    );
    expect(getByText("")).toBeTruthy();

    fireEvent.press(getByText("Login"));
    expect(getByText("로그인 기능은 아직 구현되지 않았습니다.")).toBeTruthy();
  });

  it("should change text correctly", () => {
    const { getByPlaceholderText } = render(
      <Login navigation={mockProps.navigation} route={mockProps.route} />
    );

    const idInput = getByPlaceholderText("아이디");
    fireEvent.changeText(idInput, "test");

    const passwordInput = getByPlaceholderText("비밀번호");
    fireEvent.changeText(passwordInput, "test");
  });

  it("should handle button press correctly", () => {
    const { getByText, getByTestId } = render(
      <Login navigation={mockProps.navigation} route={mockProps.route} />
    );

    fireEvent.press(getByText("Login"));
    fireEvent.press(getByTestId("kakaoButton"));
    fireEvent.press(getByTestId("naverButton"));
    fireEvent.press(getByText("비밀번호 찾기"));
    fireEvent.press(getByText("회원가입"));
  });
});
