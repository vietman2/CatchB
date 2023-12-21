import { render, fireEvent } from "@testing-library/react-native";
import {
  LoginButton,
  KakaoLoginButton,
  NaverLoginButton,
  TextButton,
} from "./Buttons";

jest.requireActual("react-native-paper")

describe("<LoginButton />", () => {
  it("renders the button with the correct text", () => {
    const { getByText } = render(
      <LoginButton text="Login" onPress={() => {}} />
    );
    expect(getByText("Login")).toBeTruthy();
  });

  it("calls onPress when the button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <LoginButton text="Login" onPress={onPressMock} />
    );
    fireEvent.press(getByText("Login"));
    expect(onPressMock).toHaveBeenCalled();
  });
});

describe("<PortalLoginButton />", () => {
  it("renders Kakao login image", () => {
    const { getByTestId } = render(<KakaoLoginButton onPress={() => {}} />);
    expect(getByTestId("kakao-button")).toBeTruthy();
  });

  it("renders Naver login image", () => {
    const { getByTestId } = render(<NaverLoginButton onPress={() => {}} />);
    expect(getByTestId("naver-button")).toBeTruthy();
  });
});

describe("<TextButton />", () => {
  it("renders the button with the correct text", () => {
    const { getByText } = render(
      <TextButton text="Submit" onPress={() => {}} />
    );
    expect(getByText("Submit")).toBeTruthy();
  });

  it("calls onPress when the button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <TextButton text="Submit" onPress={onPressMock} />
    );
    fireEvent.press(getByText("Submit"));
    expect(onPressMock).toHaveBeenCalled();
  });
});
