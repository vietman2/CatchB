import { render } from "@testing-library/react-native";

import SearchBar from "../SearchBar";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("<SearchBar />", () => {
  it("renders content", () => {
    const { getByText } = render(<SearchBar />);
    expect(getByText("검색")).toBeTruthy();
  });
});
