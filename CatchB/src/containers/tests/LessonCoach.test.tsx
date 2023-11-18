import { render, fireEvent } from "@testing-library/react-native";

import LessonCoach from "../LessonCoach";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("<LessonCoach />", () => {
  const mockCoach = {
    id: 1,
    name: "Test Coach",
    rating: 5,
    num_reviews: 10,
    price: 10000,
    description: "Test Description",
    image: "Test Image",
    location: "Test Location",
  };

  it("renders coach details and navigates on press", () => {
    const { getByText } = render(<LessonCoach coach={mockCoach} />);
    expect(getByText("Test Coach 코치")).toBeTruthy();
  });

  it("renders coach details and navigates on press", () => {
    const { getByText } = render(<LessonCoach coach={mockCoach} />);
    fireEvent.press(getByText("Test Coach 코치"));
  });
});
