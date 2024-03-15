import TodoList from "./TodoList";
import { renderWithProviders } from ".utils/test-utils";

jest.mock("react-native-paper", () => ({
  ...jest.requireActual("react-native-paper"),
  List: {
    AccordionGroup: () => <></>,
    Accordion: () => <></>,
    Item: () => <></>,
  },
}));

describe("TodoList", () => {
  it("renders correctly", () => {
    renderWithProviders(<TodoList />);
  });
});
