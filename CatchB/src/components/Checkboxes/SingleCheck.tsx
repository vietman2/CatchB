import { View } from "react-native";
import { Chip } from "react-native-paper";

import { themeColors } from "../../variables/colors";

interface Props {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
}

export default function SingleCheck({ options, selected, setSelected }: Props) {
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
        ))}
      </View>
    </>
  );
}
