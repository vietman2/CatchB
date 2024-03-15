import { render } from "@testing-library/react-native";

import { LoadingPage, LoadingComponent } from ".components/Loading";

jest.mock("react-native-paper", () => ({
  ActivityIndicator: "ActivityIndicator",
}));

describe("<LoadingPage />", () => {
  it("should render", () => {
    render(<LoadingPage />);
  });
});

describe("<LoadingComponent />", () => {
  it("should render", () => {
    render(<LoadingComponent />);
  });
});
