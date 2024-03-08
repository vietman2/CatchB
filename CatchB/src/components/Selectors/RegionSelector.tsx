import { Dispatch, SetStateAction } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import { themeColors } from "../../variables/colors";
import { Sigungu } from "../../variables/types/products";

interface Props {
  options: Sigungu[];
  multiSelected: Sigungu[];
  setMultiSelected: Dispatch<SetStateAction<Sigungu[]>>;
  showSnackBar: (show: boolean) => void;
}

export function RegionSelector({
  options,
  multiSelected,
  setMultiSelected,
  showSnackBar,
}: Readonly<Props>) {
  const isSelected = (option: Sigungu) => {
    return multiSelected.includes(option);
  };

  const toggleSelected = (option: Sigungu) => {
    if (multiSelected.includes(option)) {
      setMultiSelected(multiSelected.filter((item) => item !== option));
    } else {
      // if length exceeds 5, snack bar should be shown
      if (multiSelected.length < 5) {
        setMultiSelected([...multiSelected, option]);
      } else {
        showSnackBar(true);
      }
    }
  };

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.code}
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
          <View style={styles.box}>
            <Text
              style={[
                styles.label,
                { color: isSelected(option) ? "white" : "black" },
              ]}
            >
              {option.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
  },
});
