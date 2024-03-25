/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render } from "@testing-library/react-native";

import {
  BackButton,
  CommunityButton,
  IconTextButton,
  NaverButton,
  KakaoButton,
  TabButton,
} from ".components/Buttons";

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

describe("<CommunityButton />", () => {
  it("renders active like button correctly and handles press", () => {
    const { getByTestId } = render(
      <CommunityButton mode="like" state action={() => {}} />
    );

    fireEvent.press(getByTestId("community-button"));
  });

  it("renders inactive like button correctly", () => {
    render(<CommunityButton mode="like" number={10} />);
  });

  it("renders active like button correctly", () => {
    render(<CommunityButton mode="dislike" state />);
  });

  it("renders inactive dislike button correctly", () => {
    render(<CommunityButton mode="dislike" />);
  });

  it("renders report button correctly", () => {
    render(<CommunityButton mode="report" />);
  });
});
