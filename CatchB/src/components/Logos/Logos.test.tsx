import { render } from "@testing-library/react-native";

import { LoginLogo, SmallLogo } from "./";

describe("<LoginLogo />", () => {
  it("should render successfully", () => {
    render(<LoginLogo />);
  });
});

describe("<SmallLogo />", () => {
  it("should render successfully", () => {
    render(<SmallLogo />);
  });
});
