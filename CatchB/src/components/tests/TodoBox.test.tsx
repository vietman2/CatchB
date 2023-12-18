import { render } from "@testing-library/react-native";

import TodoBox from "../TodoBox";
import { openTodos } from "../../variables/mvp_dummy_data/todos";

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
