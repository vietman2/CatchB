import { render } from "@testing-library/react-native";

import Cards from "../Cards";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("<Cards />", () => {
  it("renders content", () => {
    const { getByText } = render(
      <Cards response_rate="100%" consults="100" likes="100" />
    );
    expect(getByText("응답률")).toBeTruthy();
  });
});
