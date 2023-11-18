import { render } from "@testing-library/react-native";

import Calendar from "../Calendar";

describe("Calendar", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Calendar />);
    expect(getByText("캘린더 화면")).toBeTruthy();
  });
});
