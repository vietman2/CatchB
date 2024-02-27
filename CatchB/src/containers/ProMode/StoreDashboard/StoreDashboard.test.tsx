import { render } from "@testing-library/react-native";

import { StoreDashboard } from "./StoreDashboard";

jest.mock("react-native-paper", () => ({
  Surface: "Surface",
  Text: "Text",
}));
jest.mock("react-native-gifted-charts", () => {
  const { PieChart } = jest.requireActual("react-native-gifted-charts");

  return {
    BarChart: "BarChart",
    CurveType: "CurveType",
    LineChart: "LineChart",
    PieChart: PieChart,
  };
});
jest.mock("../../../components/Cards", () => ({
  StatsCard: "StatsCard",
}));

describe("StoreDashboard", () => {
  it("renders correctly", () => {
    render(<StoreDashboard />);
  });
});
