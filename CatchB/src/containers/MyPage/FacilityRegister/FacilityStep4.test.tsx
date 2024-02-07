import { render } from "@testing-library/react-native";

import FacilityStep4 from "./FacilityStep4";

jest.mock("react-native-paper", () => {
  return {
    Button: "Button",
    Text: "Text",
  };
});

describe("<FacilityStep4 />", () => {
  it("should handle <FacilityStep4 /> correctly", async () => {
    render(<FacilityStep4 />);
  });
});
