import { render } from "@testing-library/react-native";

import { NotificationChip } from "./fragments";

jest.mock("react-native-paper", () => ({
  Icon: "Icon",
  Text: "Text",
}));

describe("<NotificationChip />", () => {
  it("renders store chip correctly", () => {
    render(<NotificationChip type="store" label="store" />);
  });

  it("renders worker chip correctly", () => {
    render(<NotificationChip type="worker" label="worker" />);
  });

  it("renders reservation chip correctly", () => {
    render(<NotificationChip type="reservation" label="reservation" />);
  });
});
