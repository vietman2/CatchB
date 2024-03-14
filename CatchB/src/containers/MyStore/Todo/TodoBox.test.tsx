import { render } from "@testing-library/react-native";

import TodoBox from "./TodoBox";

const openTodos = [
  {
    id: 1,
    title: "매장 내부 - 재고관리",
    done: true,
  },
  {
    id: 2,
    title: "매장 내부 - 최종 세팅",
    done: true,
  },
  {
    id: 3,
    title: "매장 외부 - 쓰레기 줍기",
    done: true,
  },
  {
    id: 4,
    title: "데스크 점검",
    done: false,
  },
];

jest.mock("react-native-paper", () => ({
  Divider: "Divider",
  Text: "Text",
  Icon: "Icon",
  ProgressBar: "ProgressBar",
}));

describe("<TodoBox />", () => {
  it("renders correctly", () => {
    render(<TodoBox title="TodoBox Title" todos={openTodos} />);
  });

  it("should handle no todos", () => {
    render(<TodoBox title="TodoBox Title" todos={[]} />);
  });
});
