import { render } from "@testing-library/react-native";

import { LoadingPage, LoadingComponent, NotReady } from ".components/Loading";

jest.mock("react-native-paper", () => ({
  ActivityIndicator: "ActivityIndicator",
  Text: "Text",
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

describe("<NotReady />", () => {
  it("should render", () => {
    render(<NotReady />);
  });
});
