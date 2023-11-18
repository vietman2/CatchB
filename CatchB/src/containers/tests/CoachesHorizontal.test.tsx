import { render } from "@testing-library/react-native";

import CoachesHorizontal from "../CoachesHorizontal";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("<CoachesHorizontal />", () => {
  it("renders content", () => {
    const { getByText } = render(<CoachesHorizontal />);
    expect(getByText("우리 동네 추천 레슨 코치!")).toBeTruthy();
  });
});
