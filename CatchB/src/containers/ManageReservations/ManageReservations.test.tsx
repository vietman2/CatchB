import { act, render, fireEvent } from "@testing-library/react-native";

import ManageReservations from "./ManageReservations";

describe("<ManageReservations />", () => {
  it("renders correctly", () => {
    render(<ManageReservations />);
  });

  it("handles tab press", async () => {
    const { getByText } = render(<ManageReservations />);

    await act(async () => {
      fireEvent.press(getByText("신규"));
    });

    await act(async () => {
      fireEvent.press(getByText("확정"));
    });

    await act(async () => {
      fireEvent.press(getByText("취소"));
    });

    await act(async () => {
      fireEvent.press(getByText("완료"));
    });

    await act(async () => {
      fireEvent.press(getByText("신규"));
    });
  });
});
