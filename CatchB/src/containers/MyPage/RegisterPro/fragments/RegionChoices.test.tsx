import { render } from "@testing-library/react-native";

import { RegionChoices } from "./RegionChoices";
import { sampleRegions } from ".data/products";

jest.mock("react-native-paper", () => ({
  Divider: "Divider",
  Text: "Text",
}));
jest.mock(".components/Selectors", () => {
  const { Text } = jest.requireActual("react-native");

  return {
    RegionSelector: "RegionSelector",
    Selector: ({ options }: { options: string[] }) => (
      <Text>{options.join(",")}</Text>
    ),
  };
});

describe("<RegionChoices />", () => {
  it("renders correctly", () => {
    render(
      <RegionChoices
        data={sampleRegions}
        selectedSido="서울특별시"
        setSelectedSido={jest.fn()}
        selectedRegions={[]}
        setSelectedRegions={jest.fn()}
        setVisible={jest.fn()}
      />
    );
  });

  it("renders no data correctly", () => {
    render(
      <RegionChoices
        data={undefined}
        selectedSido="서울특별시"
        setSelectedSido={jest.fn()}
        selectedRegions={[]}
        setSelectedRegions={jest.fn()}
        setVisible={jest.fn()}
      />
    );
  });
});
