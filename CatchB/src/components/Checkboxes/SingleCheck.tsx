import { View, Dimensions, TouchableOpacity } from "react-native";

import SelectionChip from "../Chips/SelectionChip";
import { themeColors } from "../../variables/colors";

interface Props {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
}

export default function SingleCheck({
  options,
  selected,
  setSelected,
}: Readonly<Props>) {
  const { width } = Dimensions.get("window");
  const itemWidth = (width - 40) / 2;

  const isSelected = (option: string) => {
    return selected === option;
  };

  const toggleSelected = (option: string) => {
    setSelected(option);
  };

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {options.map((option) => (
        <View key={option} style={{ width: itemWidth }}>
          <TouchableOpacity
            onPress={() => toggleSelected(option)}
            style={{
              marginRight: 10,
              marginBottom: 10,
              borderRadius: 8,
              backgroundColor: isSelected(option)
                ? themeColors.tertiaryContainer
                : themeColors.tertiary,
            }}
          >
            <SelectionChip label={option} selected={isSelected(option)} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
