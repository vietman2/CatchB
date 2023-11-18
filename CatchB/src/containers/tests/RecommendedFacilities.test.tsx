import { render } from "@testing-library/react-native";

import RecommendedFacilities from "../RecommendedFacilities";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("<RecommendedFacilities />", () => {
  it("renders facility details", () => {
    const { getByText } = render(<RecommendedFacilities />);
    expect(getByText("나에게 딱 맞는, 캐치B 추천")).toBeTruthy();
  });
});
