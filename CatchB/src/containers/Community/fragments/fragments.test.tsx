import { render } from "@testing-library/react-native";

import { InputText, Tag } from "./fragments";
import { sampleTags } from ".data/community";

jest.mock("react-native-paper", () => ({
  Text: "Text",
}));
jest.mock("react-native-svg", () => ({
  SvgCssUri: "SvgCssUri",
}));

describe("<InputText />", () => {
  it("should render disabled", () => {
    render(<InputText disabled title="title" text="text" />);
  });

  it("should render enabled", () => {
    render(<InputText title="title" text="text" />);
  });
});

describe("<Tag />", () => {
  it("should render blank", () => {
    render(<Tag blank />);
  });

  it("should render active", () => {
    render(<Tag active tag={sampleTags[0]} />);
  });

  it("should render inactive", () => {
    render(<Tag tag={sampleTags[0]} />);
  });
});
