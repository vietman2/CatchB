import { render } from "@testing-library/react-native";

import ImagePlaceholder from "./ImagePlaceholder";
import ImagePreview from "./ImagePreview";

jest.mock("react-native-paper", () => ({
  Icon: "Icon",
}));

describe("<ImagePreview />", () => {
  it("renders correctly", () => {
    render(<ImagePreview uri="https://example.com" removeImage={() => {}} />);
  });
});

describe("<ImagePlaceholder />", () => {
  it("renders correctly", () => {
    render(<ImagePlaceholder />);
  });

  it("renders correctly with canUpload", () => {
    render(<ImagePlaceholder canUpload />);
  });
});
