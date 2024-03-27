import { render } from "@testing-library/react-native";

import Preview from "./PostPreview";

jest.mock("react-native-paper", () => ({
  Divider: "Divider",
  Text: "Text",
}));
jest.mock("react-native-markdown-display", () => {
  const MockMarkdown = () => "Markdown";
  const MockMarkdownIt = jest.fn().mockImplementation(() => {
    return { disable: jest.fn() };
  });

  return {
    __esModule: true,
    default: MockMarkdown,
    MarkdownIt: MockMarkdownIt,
  };
});
jest.mock("@gorhom/bottom-sheet", () => "BottomSheet");

describe("<MdPreview />", () => {
  it("should render", () => {
    render(<Preview content="content" uploadedImages={[]} />);
  });

  it("should render uploaded images", () => {
    render(
      <Preview
        content="![업로드1](url1)\n![업로드2](url2)"
        uploadedImages={[{ url: "url1" }, { url: "url2" }]}
      />
    );
  });
});
