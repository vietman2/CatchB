import { render } from "@testing-library/react-native";

import StoreDashboard from "./StoreDashboard";

jest.mock("react-native-paper", () => ({
  Divider: "Divider",
  Text: "Text",
}));
jest.mock("react-native-gifted-charts", () => {
  const { PieChart } = jest.requireActual("react-native-gifted-charts");

  return {
    LineChart: "LineChart",
    PieChart: PieChart,
  };
});

describe("StoreDashboard", () => {
  it("renders correctly", () => {
    render(<StoreDashboard />);
  });
});
