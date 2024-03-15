import { fireEvent, render } from "@testing-library/react-native";

import { RegionSelector } from "./RegionSelector";

const object1 = {
  code: "1",
  label: "label1",
  name: "name1",
};

const options = [
  object1,
  {
    code: "2",
    label: "label2",
    name: "name2",
  },
  {
    code: "3",
    label: "label3",
    name: "name3",
  },
  {
    code: "4",
    label: "label4",
    name: "name4",
  },
  {
    code: "5",
    label: "label5",
    name: "name5",
  },
  {
    code: "6",
    label: "label6",
    name: "name6",
  },
];

const selected1 = [object1];

const selected2 = [
  {
    code: "1",
    label: "label1",
    name: "name1",
  },
  {
    code: "2",
    label: "label2",
    name: "name2",
  },
  {
    code: "3",
    label: "label3",
    name: "name3",
  },
  {
    code: "4",
    label: "label4",
    name: "name4",
  },
  {
    code: "5",
    label: "label5",
    name: "name5",
  },
];

describe("<RegionSelector />", () => {
  it("handles presses", () => {
    const { getByText } = render(
      <RegionSelector
        options={options}
        multiSelected={selected1}
        setMultiSelected={jest.fn()}
        showSnackBar={jest.fn()}
      />
    );

    fireEvent.press(getByText("label1"));
    fireEvent.press(getByText("label2"));
  });

  it("handles snackbar", () => {
    const showSnackBar = jest.fn();
    const { getByText } = render(
      <RegionSelector
        options={options}
        multiSelected={selected2}
        setMultiSelected={jest.fn()}
        showSnackBar={showSnackBar}
      />
    );

    fireEvent.press(getByText("label6"));
  });
});
