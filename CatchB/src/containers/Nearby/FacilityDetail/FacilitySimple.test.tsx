import { render, fireEvent } from "@testing-library/react-native";

import FacilitySimple from "./FacilitySimple";
import { sampleFacilities } from "../../../variables/mvp_dummy_data/facilities";

jest.mock("react-native-paper", () => ({
  ...jest.requireActual("react-native-paper"),
  Icon: "Icon",
  Text: "Text",
}));

describe("<FacilitySimple />", () => {
  it("handles the like and share button correctly", () => {
    const { getByTestId } = render(
      <FacilitySimple facility={sampleFacilities[0]} />
    );

    fireEvent.press(getByTestId("like-icon"));
    fireEvent.press(getByTestId("share-icon"));
  });
});
