import { render } from "@testing-library/react-native";

import { MainTitle, SubTitle, DisabledTextInput } from "./fragments";

jest.mock("react-native-paper", () => {
  return {
    Text: "Text",
  };
});

describe("<MainTitle />", () => {
  it("renders no sub correctly", () => {
    render(<MainTitle text="Hello" />);
  });

  it("renders with sub correctly", () => {
    render(<MainTitle text="Hello" sub="asdf" />);
  });
});

describe("<SubTitle />", () => {
  it("renders no sub correctly", () => {
    render(<SubTitle text="Hello" />);
  });

  it("renders with sub correctly", () => {
    render(<SubTitle text="Hello" sub="asdf" />);
  });
});

describe("<DisabledTextInput />", () => {
  it("renders correctly", () => {
    render(<DisabledTextInput text="Hello" />);
  });
});
