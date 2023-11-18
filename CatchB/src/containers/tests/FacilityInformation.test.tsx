import { render } from "@testing-library/react-native";

import Information from "../FacilityInformation";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("Information", () => {
  const facility = {
    id: 1,
    name: "테스트",
    address: "테스트 주소",
    rating: 4.5,
    num_reviews: 100,
    price: 10000,
    description: ["테스트 설명"],
    location: {
      latitude: 37.5,
      longitude: 127.5,
    },
  };

  it("renders correctly", () => {
    const { getByText } = render(<Information facility={facility} />);

    expect(getByText("테스트")).toBeTruthy();
  });
});
