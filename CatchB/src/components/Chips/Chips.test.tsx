import { render } from "@testing-library/react-native";

import { PostTagChip } from "./";

jest.mock("react-native-paper", () => ({
  Chip: "Chip",
}));

describe("<PostTagChip />", () => {
  it("renders correctly", () => {
    render(<PostTagChip label="Label" />);
  });
});
