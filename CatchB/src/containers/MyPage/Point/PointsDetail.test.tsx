import { render } from "@testing-library/react-native";

import PointsDetail from "./PointsDetail";
import { samplePoints } from ".data/users";

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
