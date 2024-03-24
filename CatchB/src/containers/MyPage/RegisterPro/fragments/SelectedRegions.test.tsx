import { fireEvent, render } from "@testing-library/react-native";

import { SelectedRegions } from "./SelectedRegions";
import { sampleSigungu } from ".data/products";

jest.mock(".components/Chips", () => {
  const { TouchableOpacity, Text } = jest.requireActual("react-native");
  return {
    RegionChip: ({ text, onPress }: { text: string; onPress: () => void }) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{text}</Text>
      </TouchableOpacity>
    ),
  };
});

describe("<SelectedRegions />", () => {
  it("renders no selected regions correctly", () => {
    render(<SelectedRegions selectedRegions={[]} removeSelected={jest.fn()} />);
  });

  it("renders selected regions correctly", () => {
    const { getByText } = render(
      <SelectedRegions
        selectedRegions={sampleSigungu}
        removeSelected={jest.fn()}
      />
    );

    fireEvent.press(getByText("종로구"));
  });
});
