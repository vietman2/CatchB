import { render } from "@testing-library/react-native";

import PointsDetail from "./PointsDetail";
import NoPoints from "./NoPoints";
import { samplePoints } from "../../variables/mvp_dummy_data/points";

jest.mock("react-native-paper", () => {
  return {
    Text: "Text",
  };
});

describe("<PointsDetail />", () => {
  it("renders correctly", () => {
    render(<PointsDetail detail={samplePoints[0]} />);
  });
});

describe("<NoPoints />", () => {
  it("renders correctly", () => {
    render(<NoPoints />);
  });
});
