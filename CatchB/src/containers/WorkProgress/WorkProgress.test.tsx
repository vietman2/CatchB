import { render } from "@testing-library/react-native";

import WorkProgress from "./WorkProgress";

jest.mock("react-native-paper", () => ({
  Text: "Text",
}));
jest.mock("../Todo/TodoBox", () => "TodoBox");

describe("<WorkProgress />", () => {
  it("should render correctly", () => {
    render(<WorkProgress />);
  });
});
