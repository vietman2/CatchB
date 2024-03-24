import { render } from "@testing-library/react-native";

import { CoachTypeChip } from "./CoachTypeChip";
import { RegionChip } from "./RegionChip";

jest.mock("react-native-paper", () => ({
  Text: "Text",
}));

describe("<CoachTypeChip />", () => {
  it("renders academy coach correctly", () => {
    render(<CoachTypeChip is_academy_coach />);
  });

  it("renders catchb coach correctly", () => {
    render(<CoachTypeChip is_academy_coach={false} />);
  });
});

describe("<RegionChip />", () => {
  it("renders correctly", () => {
    render(<RegionChip text="서울특별시" />);
  });
});
