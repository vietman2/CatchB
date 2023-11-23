import { render, fireEvent } from "@testing-library/react-native";

import SignUp from "../SignUp";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("[SignUp] screen rendering test", () => {
  it("should render correctly", () => {
    const { getByText, getByPlaceholderText } = render(<SignUp />);

    expect(getByText("회원가입")).toBeTruthy();
    expect(getByPlaceholderText("아이디")).toBeTruthy();
    expect(getByPlaceholderText("비밀번호")).toBeTruthy();
    expect(getByPlaceholderText("비밀번호 확인")).toBeTruthy();
  });

  it("should render error message correctly", () => {
    const { getByText } = render(<SignUp />);
    expect(getByText("")).toBeTruthy();

    fireEvent.press(getByText("회원가입"));
    expect(getByText("회원가입 기능은 아직 구현되지 않았습니다.")).toBeTruthy();
  });

  it("should change text correctly", () => {
    const { getByPlaceholderText } = render(<SignUp />);

    const idInput = getByPlaceholderText("아이디");
    fireEvent.changeText(idInput, "test");

    const emailInput = getByPlaceholderText("이메일");
    fireEvent.changeText(emailInput, "test@email.com");

    const passwordInput = getByPlaceholderText("비밀번호");
    fireEvent.changeText(passwordInput, "test");

    const passwordCheckInput = getByPlaceholderText("비밀번호 확인");
    fireEvent.changeText(passwordCheckInput, "test");
  });
});
