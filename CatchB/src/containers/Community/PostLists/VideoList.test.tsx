import { VideoList } from "./VideoList";
import { renderWithProviders } from "../../../utils/test-utils";

jest.mock("./", () => ({
  PlaceholderComponent: "PlaceholderComponent",
}));

describe("<VideoList />", () => {
  it("renders correctly", () => {
    renderWithProviders(<VideoList />);
  });
});
