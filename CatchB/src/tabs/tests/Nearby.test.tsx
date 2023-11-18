import { render } from "@testing-library/react-native";

import Nearby from "../Nearby";

jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  const MockMapView = (props: any) => {
    return <View>{props.children}</View>;
  };
  const MockMarker = (props: any) => {
    return <View>{props.children}</View>;
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});

describe("Nearby", () => {
  it("renders correctly", () => {
    render(<Nearby />);
  });
});
