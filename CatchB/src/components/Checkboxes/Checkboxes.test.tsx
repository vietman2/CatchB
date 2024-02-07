import { render, fireEvent, waitFor } from "@testing-library/react-native";

import SingleCheck from "./SingleCheck";
import MultiCheck from "./MultiCheck";

jest.mock("react-native-paper", () => ({
  Text: "Text",
  Icon: "Icon",
}));

describe("<SingleCheck />", () => {
  it("renders the correct number of chips", async () => {
    const { getByText } = render(
      <SingleCheck
        options={["Option 1", "Option 2"]}
        selected="Option 2"
        setSelected={() => {}}
      />
    );

    await waitFor(() => {
      fireEvent.press(getByText("Option 2"));
      fireEvent.press(getByText("Option 1"));
    });
  });

  it("renders the correct number of chips with required prop", async () => {
    const { getByText } = render(
      <SingleCheck
        options={["Option 1", "Option 2"]}
        selected="Option 2"
        setSelected={() => {}}
        required
      />
    );

    await waitFor(() => {
      fireEvent.press(getByText("Option 2"));
      fireEvent.press(getByText("Option 1"));
    });
  });
});

describe("<MultiCheck />", () => {
  it("renders the correct number of chips", async () => {
    const { getByText } = render(
      <MultiCheck
        options={["Option 1", "Option 2"]}
        selected={["Option 2"]}
        setSelected={() => {}}
      />
    );

    await waitFor(() => fireEvent.press(getByText("Option 1")));
    await waitFor(() => fireEvent.press(getByText("Option 2")));
  });
});
