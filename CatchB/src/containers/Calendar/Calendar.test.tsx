import { render, waitFor } from "@testing-library/react-native";

import Calendar from "./Calendar";

describe("Calendar", () => {
  it("renders correctly", async () => {
    await waitFor(() => render(<Calendar />));
  });
});
