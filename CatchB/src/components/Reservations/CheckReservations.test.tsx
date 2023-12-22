import { render } from "@testing-library/react-native";

import CheckReservations from "./CheckReservations";

describe("<CheckReservations />", () => {
  it("renders New tab correctly", () => {
    const { getByText } = render(
      <CheckReservations tab="New" reservations={[]} />
    );
    getByText("신규 예약이 없습니다.");
  });

  it("renders Pending tab correctly", () => {
    render(
      <CheckReservations tab="Pending" reservations={[]} />
    );
  });

  it("renders Cancelled tab correctly", () => {
    render(
      <CheckReservations tab="Cancelled" reservations={[]} />
    );
  });

  it("renders Completed tab correctly", () => {
    render(
      <CheckReservations tab="Completed" reservations={[]} />
    );
  });
});
