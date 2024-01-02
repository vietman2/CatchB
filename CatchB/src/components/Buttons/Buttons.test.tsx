import { render, fireEvent } from "@testing-library/react-native";

import BackButton from "./BackButton";
import LoginButton from "./LoginButton";
import TextButton from "./TextButton";
import SurfaceButton from "./SurfaceButton";
import SegmentedButtons from "./SegmentedButtons";
import FABGroup from "./FAB";
import KakaoButton from "./KakaoButton";
import NaverButton from "./NaverButton";
import IconButton from "./IconButton";
import TabButton from "./TabButton";
import { renderWithProviders } from "../../utils/test-utils";

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

describe("<LoginButton />", () => {
  it("renders the button with the correct text", () => {
    const { getByText } = render(
      <LoginButton text="Login" onPress={() => {}} />
    );
    expect(getByText("Login")).toBeTruthy();
  });

  it("calls onPress when the button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <LoginButton text="Login" onPress={onPressMock} />
    );
    fireEvent.press(getByText("Login"));
    expect(onPressMock).toHaveBeenCalled();
  });
});

describe("<TextButton />", () => {
  it("renders the button with the correct text", () => {
    const { getByText } = render(
      <TextButton text="Submit" onPress={() => {}} />
    );
    expect(getByText("Submit")).toBeTruthy();
  });

  it("calls onPress when the button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <TextButton text="Submit" onPress={onPressMock} />
    );
    fireEvent.press(getByText("Submit"));
    expect(onPressMock).toHaveBeenCalled();
  });
});

describe("<SurfaceButton />", () => {
  it("renders correctly", () => {
    render(<SurfaceButton icon="home" title="Home" />);
  });
});

describe("<FABGroup />", () => {
  it("renders correctly", () => {
    renderWithProviders(<FABGroup />);
  });

  it("handles press events", () => {
    const { getByTestId, getAllByTestId } = renderWithProviders(<FABGroup />);

    fireEvent.press(getByTestId("FABGroup"));
    fireEvent.press(getAllByTestId("card")[0]);
    fireEvent.press(getAllByTestId("card")[1]);
    fireEvent.press(getByTestId("add"));
    fireEvent.press(getByTestId("view"));
  });
});

describe("<SegmentedButtons />", () => {
  it("renders without crashing", () => {
    render(<SegmentedButtons tab="Dashboard" onPress={() => {}} />);
  });

  it("should handle onPress", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <SegmentedButtons tab="Dashboard" onPress={onPress} />
    );
    fireEvent.press(getByText("대시보드"));
    fireEvent.press(getByText("매출관리"));
    fireEvent.press(getByText("예약관리"));
    fireEvent.press(getByText("업무관리"));
    fireEvent.press(getByText("고객관리"));
  });

  it("should handle styles 1", () => {
    const onPress = jest.fn();
    render(<SegmentedButtons tab="Sales" onPress={onPress} />);
  });

  it("should handle styles 2", () => {
    const onPress = jest.fn();
    render(<SegmentedButtons tab="Reservation" onPress={onPress} />);
  });

  it("should handle styles 3", () => {
    const onPress = jest.fn();
    render(<SegmentedButtons tab="Tasks" onPress={onPress} />);
  });

  it("should handle styles 4", () => {
    const onPress = jest.fn();
    render(<SegmentedButtons tab="Customers" onPress={onPress} />);
  });
});

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
    render(<TabButton title="Home" detail="Detail" />);
  });
});
