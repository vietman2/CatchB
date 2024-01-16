import { render, fireEvent, waitFor } from "@testing-library/react-native";

import ManageReservations from "./ManageReservations";

describe("<ManageReservations />", () => {
  it("renders correctly", () => {
    render(<ManageReservations />);
  });

  it("handles tab press", () => {
    const { getByText } = render(<ManageReservations />);

    waitFor(() => {
      fireEvent.press(getByText("신규"));
      fireEvent.press(getByText("확정"));
      fireEvent.press(getByText("취소"));
      fireEvent.press(getByText("완료"));
    });
  });

  it("handles wrong tab state", () => {
    const react = jest.requireActual("react");
    react.useState = jest.fn().mockReturnValue(["wrong", jest.fn()]);

    const { getByText } = render(<ManageReservations />);

    waitFor(() => {
      fireEvent.press(getByText("신규"));
    });
  });
});
