import { render } from "@testing-library/react-native";

import CoachInformation from "../CoachInformation";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("[CoachInformation] screen rendering test", () => {
  it("should render correctly", () => {
    const coach = {
      id: 1,
      name: "김코치",
      price: 10000,
      rating: 4.5,
      num_reviews: 100,
      career: ["경력1", "경력2", "경력3"],
      location: "서울시 강남구",
    };

    const { getByText } = render(<CoachInformation coach={coach} />);

    expect(getByText("4년제 졸업 / 30대")).toBeTruthy();
    expect(getByText("김코치 코치")).toBeTruthy();
  });
});
