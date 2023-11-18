import { render } from "@testing-library/react-native";

import { MainHeading, SubHeading } from "../Heading";

describe("<MainHeading />", () => {
  it("renders content", () => {
    const { getByText } = render(<MainHeading content="Test Heading" />);
    expect(getByText("Test Heading")).toBeTruthy();
  });
});

describe("<SubHeading />", () => {
  it("renders content", () => {
    const { getByText } = render(<SubHeading content="Test Heading" />);
    expect(getByText("Test Heading")).toBeTruthy();
  });
});
