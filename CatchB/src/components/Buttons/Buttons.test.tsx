/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@testing-library/react-native";

import {
  BackButton,
  IconTextButton,
  NaverButton,
  KakaoButton,
  TabButton,
} from "./";

jest.mock("react-native-paper", () => ({
  Surface: "Surface",
  Icon: "Icon",
  IconButton: "IconButton",
  Text: "Text",
}));

describe("<KakaoButton />", () => {
  it("renders correctly", () => {
    render(<KakaoButton />);
  });
});

describe("<NaverButton />", () => {
  it("renders correctly", () => {
    render(<NaverButton />);
  });
});

describe("<BackButton />", () => {
  it("renders correctly", () => {
    render(<BackButton onPress={() => {}} />);
  });
});

describe("<IconButton />", () => {
  it("renders correctly", () => {
    render(<IconTextButton icon="home" title="Home" />);
  });
});

describe("<TabButton />", () => {
  it("renders correctly", () => {
    render(<TabButton title="Home" detail="Detail" showArrow />);
  });
});
