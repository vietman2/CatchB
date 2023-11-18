import { render } from "@testing-library/react-native";

import RecentFacilities from "../RecentFacilities";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("<RecentFacilities />", () => {
  it("renders correctly", () => {
    const { getByText } = render(<RecentFacilities />);
    expect(getByText("최근 본 시설")).toBeTruthy();
  });
});
