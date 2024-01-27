import { render, waitFor } from "@testing-library/react-native";

import CalendarMain from "./CalendarMain";

describe("Calendar", () => {
  it("renders correctly with actual date", async () => {
    await waitFor(() => render(<CalendarMain />));
  });

  it("renders correctly with mocked date 1", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2024, 5, 5));

    await waitFor(() => render(<CalendarMain />));
  });

  it("renders correctly with mocked date 2", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 11, 11));

    await waitFor(() => render(<CalendarMain />));
  });
});
