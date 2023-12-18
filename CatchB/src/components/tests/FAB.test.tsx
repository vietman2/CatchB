import { fireEvent } from "@testing-library/react-native";

import { FABGroup } from "../FAB";
import { renderWithProviders } from "../../utils/test-utils";

jest.requireActual("react-native-paper");
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initial: any) => [initial, jest.fn()],
}));

describe("<FABGroup />", () => {
  it("renders correctly", () => {
    renderWithProviders(<FABGroup />);
  });

  it("handles press events", () => {
    const { getByTestId, getAllByTestId } = renderWithProviders(<FABGroup />);

    fireEvent.press(getByTestId("FABGroup"));
    fireEvent.press(getAllByTestId("card")[0]);
    fireEvent.press(getAllByTestId("card")[1]);
    fireEvent.press(getByTestId("add"));
    fireEvent.press(getByTestId("view"));
  });
});
