import { render, fireEvent } from "@testing-library/react-native";
import { LoginButton, PortalLoginButton, TextButton } from "../Buttons";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

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
  it("renders Kakao login image when kakao prop is true", () => {
    const { getByTestId } = render(
      <PortalLoginButton kakao={true} onPress={() => {}} />
    );
    expect(getByTestId("kakaoButton")).toBeTruthy();
  });

  it("renders Naver login image when kakao prop is false", () => {
    const { getByTestId } = render(
      <PortalLoginButton kakao={false} onPress={() => {}} />
    );
    expect(getByTestId("naverButton")).toBeTruthy();
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
