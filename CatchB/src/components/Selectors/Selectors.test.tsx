import { render, fireEvent, waitFor } from "@testing-library/react-native";

import { Selector } from "./";

jest.mock("react-native-paper", () => ({
  Text: "Text",
  Icon: "Icon",
}));

describe("<Selector />", () => {
  it("renders single choice selector", async () => {
    const { getByText } = render(
      <Selector
        multiple={false}
        options={["Option 1", "Option 2"]}
        singleSelected="Option 2"
        setSingleSelected={() => {}}
      />
    );

    await waitFor(() => {
      fireEvent.press(getByText("Option 2"));
      fireEvent.press(getByText("Option 1"));
    });
  });

  it("renders multi choice selector", async () => {
    const { getByText } = render(
      <Selector
        multiple
        options={["Option 1", "Option 2"]}
        multiSelected={["Option 2"]}
        setMultiSelected={() => {}}
      />
    );

    await waitFor(() => fireEvent.press(getByText("Option 1")));
    await waitFor(() => fireEvent.press(getByText("Option 2")));
  });
});
