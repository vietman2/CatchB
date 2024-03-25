import { render } from "@testing-library/react-native";

import ErrorPage from "./ErrorPage";

jest.mock("react-native-paper", () => ({
  Text: "Text",
}));

describe("<ErrorPage />", () => {
  it("renders correctly", () => {
    render(<ErrorPage />);
  });

  it("renders correctly with onRefresh prop", () => {
    render(<ErrorPage onRefresh={() => {}} />);
  });
});
