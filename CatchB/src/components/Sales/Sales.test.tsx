import { render } from "@testing-library/react-native";

import DailySales from "./DailySales";
import MonthlySales from "./MonthlySales";
import { DailySalesList } from "../../variables/mvp_dummy_data/sales";

jest.mock("react-native-paper", () => ({
  Text: "Text",
  Icon: "Icon",
}));

describe("<DailySales />", () => {
  it("renders correctly", () => {
    render(<DailySales sales={DailySalesList[0]} />);
  });
});

describe("<MonthlySales />", () => {
  it("renders correctly", () => {
    render(<MonthlySales />);
  });
});
