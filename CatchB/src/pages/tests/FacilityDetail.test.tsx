import { render } from "@testing-library/react-native";

import FacilityDetail from "../FacilityDetail";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: () => ({
    params: {
      facility: {
        id: 1,
        name: "테스트",
      },
    },
  }),
}));

describe("[FacilityDetail] screen rendering test", () => {
  it("should render correctly", () => {
    const { getByText } = render(<FacilityDetail />);
    expect(getByText("테스트")).toBeTruthy();
  });
});
