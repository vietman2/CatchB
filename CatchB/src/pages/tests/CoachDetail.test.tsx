import { render } from "@testing-library/react-native";

import CoachDetail from "../CoachDetail";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: () => ({
    params: {
      coach: {
        id: 1,
        name: "김코치",
      },
    },
  }),
}));

describe("[CoachDetail] screen rendering test", () => {
  it("should render correctly", () => {
    const { getByText } = render(<CoachDetail />);
    expect(getByText("김코치 코치")).toBeTruthy();
  });
});
