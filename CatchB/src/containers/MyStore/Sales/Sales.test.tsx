import { render } from "@testing-library/react-native";

import Sales from "./Sales";

jest.mock("../../../components/Sales/MonthlySales", () => "MonthlySales");
jest.mock("../../../components/Sales/DailySales", () => "DailySales");

describe("<Sales />", () => {
  it("renders correctly", () => {
    render(<Sales />);
  });
});
