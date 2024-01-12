import { render } from "@testing-library/react-native";

import FacilitySimple from "./FacilitySimple";
import { sampleFacilities } from "../../variables/mvp_dummy_data/facilities";

jest.mock("react-native-paper", () => ({
  ...jest.requireActual("react-native-paper"),
  Icon: "Icon",
  Text: "Text",
}));

describe("<FacilitySimple />", () => {
  it("renders correctly", () => {
    render(<FacilitySimple facility={sampleFacilities[0]} />);
  });
});
