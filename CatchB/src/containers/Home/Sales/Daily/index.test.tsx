import { render } from "@testing-library/react-native";

import Daily from "./";
import { DailySalesList } from "../../../../variables/mvp_dummy_data/sales";

jest.mock("react-native-paper", () => {
  return {
    Icon: "Icon",
    Text: "Text",
  };
});

describe("<Daily />", () => {
  it("renders correctly", () => {
    render(<Daily sales={DailySalesList[0]} />);
  });
});
