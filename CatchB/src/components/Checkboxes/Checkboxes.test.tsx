import { render, fireEvent, waitFor } from "@testing-library/react-native";

import SingleCheck from "./SingleCheck";
import MultiCheck from "./MultiCheck";

jest.mock("react-native-paper", () => {
  const { Text, TouchableOpacity } = jest.requireActual("react-native");

  const MockChip = (props: any) => (
    <TouchableOpacity onPress={props.onPress}>
      <Text>{props.children}</Text>
    </TouchableOpacity>
  );

  return {
    ...jest.requireActual("react-native-paper"),
    Chip: MockChip,
  };
});

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
