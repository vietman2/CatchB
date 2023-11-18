import { render } from "@testing-library/react-native";

import Items from "../Items";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("<Items />", () => {
  it("renders content", () => {
    const { getByText } = render(<Items />);
    expect(getByText("Catch B 핫정보!")).toBeTruthy();
  });
});
