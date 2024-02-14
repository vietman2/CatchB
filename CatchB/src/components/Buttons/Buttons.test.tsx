/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@testing-library/react-native";

import BackButton from "./BackButton";
import KakaoButton from "./KakaoButton";
import NaverButton from "./NaverButton";
import IconButton from "./IconButton";
import TabButton from "./TabButton";

jest.mock("react-native-paper", () => ({
  ...jest.requireActual("react-native-paper"),
  Surface: (props: any) => props.children,
  Icon: (props: any) => props.children,
  IconButton: (props: any) => props.children,
}));
jest.requireActual("react-native-paper");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial: any) => [initial, jest.fn()],
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
    render(<IconButton icon="home" title="Home" />);
  });
});

describe("<TabButton />", () => {
  it("renders correctly", () => {
    render(<TabButton title="Home" detail="Detail" showArrow />);
  });
});
