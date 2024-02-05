import { View, Dimensions, TouchableOpacity } from "react-native";

import MyChip from "../Chips/MyChip";
import { themeColors } from "../../variables/colors";

interface Props {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
}

export default function SingleCheck({ options, selected, setSelected }: Props) {
  const { width } = Dimensions.get("window");
  const itemWidth = (width - 40) / 3;

  const isSelected = (option: string) => {
    return selected === option;
  };

  const toggleSelected = (option: string) => {
    if (selected === option) {
      setSelected("");
    } else {
      setSelected(option);
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
        {/*
          <Chip
            key={index}
            style={{
              marginRight: 10,
              marginBottom: 10,
              backgroundColor: isSelected(option)
                ? themeColors.primary
                : themeColors.tertiary,
            }}
            mode="flat"
            showSelectedCheck
            showSelectedOverlay
            selectedColor="white"
            compact
            selected={isSelected(option)}
            onPress={() => toggleSelected(option)}
          >
            {option}
          </Chip>
          */}
      </View>
    </>
  );
}
