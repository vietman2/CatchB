import { fireEvent } from "@testing-library/react-native";

import { renderWithProviders } from "../../utils/test-utils";
import SignUp from "../SignUp";

describe("<SignUp />", () => {
  it("should render correctly", () => {
    renderWithProviders(<SignUp />);
  });

  it("should handle text input change", () => {
    const { getByTestId } = renderWithProviders(<SignUp />);

    const usernameInput = getByTestId("username-input");
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const passwordCheckInput = getByTestId("password-check-input");
    const firstNameInput = getByTestId("first-name-input");
    const lastNameInput = getByTestId("last-name-input");
    const phoneNumberInput = getByTestId("phone-number-input");

    fireEvent.changeText(usernameInput, "test");
    fireEvent.changeText(emailInput, "test");
    fireEvent.changeText(passwordInput, "test");
    fireEvent.changeText(passwordCheckInput, "test");
    fireEvent.changeText(firstNameInput, "test");
    fireEvent.changeText(lastNameInput, "test");
    fireEvent.changeText(phoneNumberInput, "test");
  });

  it("should handle sign up button press", () => {
    const { getByTestId } = renderWithProviders(<SignUp />);

    const signUpButton = getByTestId("sign-up-button");

    fireEvent.press(signUpButton);
  });

  it("should handle password eye icon press", () => {
    const { getByTestId } = renderWithProviders(<SignUp />);

    const passwordEyeIcon = getByTestId("password-eye-icon");
    const passwordCheckEyeIcon = getByTestId("password-check-eye-icon");

    fireEvent.press(passwordEyeIcon);
    fireEvent.press(passwordCheckEyeIcon);
  });
});
