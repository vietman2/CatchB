import { VideoList } from "./VideoList";
import { renderWithProviders } from ".utils/test-utils";

describe("<VideoList />", () => {
  it("renders correctly", () => {
    renderWithProviders(<VideoList />);
  });
});
