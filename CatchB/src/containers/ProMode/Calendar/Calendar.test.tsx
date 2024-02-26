import { render } from "@testing-library/react-native";

import { Calendar } from "./Calendar";

describe("<Calendar />", () => {
  it("renders current time correctly", () => {
    render(<Calendar />);
  });

  it("renders with fake timer 1: 2021-10-10", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2021-10-10").getTime());

    render(<Calendar />);
  });

  it("renders with fake timer 2: 2021-01-01", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2021-01-01").getTime());

    render(<Calendar />);
  });
});
