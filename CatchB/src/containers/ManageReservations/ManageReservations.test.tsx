import { render, fireEvent } from "@testing-library/react-native";

import ManageReservations from "./ManageReservations";

describe("<ManageReservations />", () => {
  it("renders correctly", () => {
    render(<ManageReservations />);
  });

  it("handles tab press", () => {
    const { getByText } = render(<ManageReservations />);

    fireEvent.press(getByText("신규"));
    fireEvent.press(getByText("미확정"));
    fireEvent.press(getByText("취소"));
    fireEvent.press(getByText("완료"));
  });
});
