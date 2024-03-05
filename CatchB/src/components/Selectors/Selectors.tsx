import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";

import { themeColors } from "../../variables/colors";

interface Props {
  options: string[];
  multiple?: boolean;
  noIcon?: boolean;
  singleSelected?: string;
  multiSelected?: string[];
  setSingleSelected?: (selected: string) => void;
  setMultiSelected?: (selected: string[]) => void;
}

export function Selector({
  options,
  multiple,
  noIcon,
  singleSelected,
  multiSelected,
  setSingleSelected,
  setMultiSelected,
}: Readonly<Props>) {
  const { width } = Dimensions.get("window");
  const itemWidth = (width - 40) / 2;

  const isSelected = (option: string) => {
    if (multiple) {
      return multiSelected.includes(option);
    } else {
      return singleSelected === option;
    }
  };

  const toggleSelected = (option: string) => {
    if (multiple) {
      if (multiSelected.includes(option)) {
        setMultiSelected(multiSelected.filter((item) => item !== option));
      } else {
        setMultiSelected([...multiSelected, option]);
      }
    } else {
      setSingleSelected(option);
    }
  };

  return (
    <View style={styles.selector}>
      {options.map((option) => (
        <View key={option} style={noIcon ? {} : { width: itemWidth }}>
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
            <SelectionChip
              label={option}
              selected={isSelected(option)}
              noIcon={noIcon}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

interface ChipProps {
  selected: boolean;
  label: string;
  noIcon?: boolean;
}

function SelectionChip({ selected, label, noIcon }: Readonly<ChipProps>) {
  if (noIcon) {
    return (
      <View style={styles.box}>
        <Text style={[styles.label, { color: selected ? "white" : "black" }]}>
          {label}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.chipContainer}>
        <Text
          style={[styles.chipText, { color: selected ? "white" : "black" }]}
        >
          {label}
        </Text>
        <Icon
          source="check"
          color={selected ? "white" : "transparent"}
          size={20}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingLeft: 10,
    paddingRight: 6,
  },
  chipText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingLeft: 5,
  },
  box: {
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
  },
  selector: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
