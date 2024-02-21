import { render } from "@testing-library/react-native";

import Sales from "./";

jest.mock("./Daily", () => "DailySales");
jest.mock("./Monthly", () => "MonthlySales");

describe("<Sales />", () => {
  it("renders correctly", () => {
    render(<Sales />);
  });
});
