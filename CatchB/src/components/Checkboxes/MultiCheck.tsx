import { View, TouchableOpacity, Dimensions } from "react-native";

import MyChip from "../Chips/MyChip";
import { themeColors } from "../../variables/colors";

interface Props {
  options: string[];
  selected: string[];
  setSelected: (selected: string[]) => void;
}

export default function MultiCheck({ options, selected, setSelected }: Props) {
  const { width } = Dimensions.get("window");
  const itemWidth = (width - 40) / 2;

  const isSelected = (option: string) => {
    return selected.includes(option);
  };

  const toggleSelected = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  return (
    <>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {options.map((option, index) => (
          <View key={index} style={{ width: itemWidth }}>
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
              <MyChip label={option} selected={isSelected(option)} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
}
