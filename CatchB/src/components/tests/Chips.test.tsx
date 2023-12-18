import { render } from "@testing-library/react-native";

import { NotificationChip, NotificationChipWithSurface, SimpleChip } from "../Chips";

jest.mock("react-native-paper", () => ({
  Chip: "Chip",
  Surface: "Surface",
}));

describe("<NotificationChip />", () => {
  it("renders correctly", () => {
    render(
      <NotificationChip
        text="text"
        icon="icon"
        backgroundColor="backgroundColor"
        textColor="textColor"
      />
    );
  });
});

describe("<NotificationChipWithSurface />", () => {
  it("renders correctly", () => {
    render(
      <NotificationChipWithSurface
        text="text"
        icon="icon"
        backgroundColor="backgroundColor"
        textColor="textColor"
      />
    );
  });

  it("renders correctly with redDot", () => {
    render(
      <NotificationChipWithSurface
        text="text"
        icon="icon"
        backgroundColor="backgroundColor"
        textColor="textColor"
        redDot
      />
    );
  });
});

describe("<SimpleChip />", () => {
  it("renders correctly", () => {
    render(
      <SimpleChip
        text="text"
        icon="icon"
        backgroundColor="backgroundColor"
        textColor="textColor"
      />
    );
  });
});
