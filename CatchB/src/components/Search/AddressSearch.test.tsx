import { render } from "@testing-library/react-native";

import AddressSearch from "./AddressSearch";

jest.mock("@actbase/react-daum-postcode", () => "Postcode");

describe("<AddressSearch />", () => {
  it("renders the address search component", () => {
    render(<AddressSearch />);
  });
});
