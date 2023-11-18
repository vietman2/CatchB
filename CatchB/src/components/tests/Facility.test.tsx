import { render, fireEvent, act } from "@testing-library/react-native";

import { FacilityLarge, FacilitySmall } from "../Facility";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("<FacilityLarge />", () => {
  const mockFacility = {
    id: 1,
    name: "Test Facility",
    address: "Test Address",
    location: { latitude: 0, longitude: 0 },
  };

  it("renders facility details and navigates on press", () => {
    const { getByText, getByTestId } = render(
      <FacilityLarge facility={mockFacility} />
    );
    expect(getByText(mockFacility.name)).toBeTruthy();
    fireEvent.press(getByTestId("facility-large"));
  });
});

describe("<FacilitySmall />", () => {
  const mockFacility = {
    id: 1,
    name: "Test Facility",
    address: "Test Address",
    location: { latitude: 0, longitude: 0 },
  };

  it("renders facility name and handles press events", () => {
    const { getByText, getByTestId } = render(
      <FacilitySmall facility={mockFacility} />
    );
    expect(getByText(mockFacility.name)).toBeTruthy();
    fireEvent.press(getByTestId("facility-small"));
  });
});
