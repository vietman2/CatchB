import { render } from "@testing-library/react-native";

import Calendar from "../Calendar";

describe("Calendar", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Calendar />);
    expect(getByText("Catch B")).toBeTruthy();
    expect(getByText("캐치비")).toBeTruthy();
  });
});
